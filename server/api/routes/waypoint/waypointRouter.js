/**
 * Routes dedicated to interfacing with the database containing GPS coordinates
 * @module routes/api/waypoint
 */

const express = require('express'); 
const waypointModel = require('./waypointModel')

const router = express.Router(); 


/** 
 * GET /api/waypoints/:journey_id
 * @summary Get all waypoints for a journey
 * @security BearerAuth
 * @param {String} journey_id.path.required - The id of the journey to get waypoints for. 
 * @returns {Array<Object>} 200 - OK - application/json - An array of waypoint objects.
 * @returns {Object} 403 - Forbidden - application/json
*/
router.get('/:journey_id', async (req, res,next) => {
    const { journey_id } = req.params;
    const token = req.body; // TODO: get token from the request Authorization header
    try {
        const waypoints = await waypointModel.getWaypointsByJourneyId(token,journey_id);
        res.status(200).json(waypoints);
    } catch (e) {
        next({status:403,message:e.message});
    }
})

/** 
 * @function validateGPSData
 * @description validate the object passed in conforms to the GPSDATA schema
 * @param {Object} gpsData - The object to validate
 * @returns {Object} gpsData(removed invalid fields)
 * @throws {Error} if not all required fields are present  
*/
function validateGPSData({time,lat,lon,label} = gpsData) {
    if(!time || !lat || !lon) throw new Error(`missing required fields:\n${
        !!time || 'time (milliseconds since epoch)\n', 
        !!lat || 'lat (float between -90 and 90)\n',  
        !!lon || 'lon (float between -180 and 180)\n'
    }
    `);
    const schema = {
        time: (a)=> new Date(a) instanceof Date && !isNaN(new Date(a)),
        lat:  (a)=> typeof a === 'number' && a >= -90 && a <= 90,
        lon:  (a)=> typeof a === 'number' && a >= -180 && a <= 180,
        label:(a)=> typeof a === 'string' || typeof a === 'undefined'
    }
    for(let k of schema){
        if(!schema[k](gpsData[k])) throw new Error(`invalid field ${k}:\n${gpsData[k]}\nFor more information, see our documentation here: https://github.com/dawsonreschke`);
    }
    return {time,lat,lon,label}; 
}

/** 
 * POST /api/waypoints/:device_secret/:is_new 
 * @summary Adds a new waypoint in the database. Can also be used to create a new journey.
 * @param {String} device_secret.path.required - The device_secret of the device to add
 * @param {Boolean} is_new.body.optional - Indicates whether the data being sent initializes a new journey.
 * @param {Object} gpsData.body.required - The GPS data to be stored in the database.
 * @returns {String} 200 - OK - text/plain `OK`
 * @returns {Object} 400 - Bad Request - application/json 
 * @returns {Object} 403 - Forbidden - application/json
*/
router.post('/:device_secret', async (req, res,next) => {
    const { device_secret } = req.params;
    const { is_new } = req.query; 
    const gpsData = req.body;
    try {
        validateGPSData(gpsData); 
    } catch (e) {
        next({status:400,message:e.message});
        return; 
    }
    try{
        let addedWaypoint = await waypointModel.addWaypoint(device_secret,gpsData,is_new);
        res.status(200).json('OK'); 
    }catch(e){
        next({status:403,message:e.message});
    }
})


module.exports = router;