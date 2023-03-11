/** 
 * Database interface for interfacing with the `plots` table
 * @module models/waypoint
 */

const deviceModel = require('../device/deviceModel')
const journeyModel = require('../journey/journeyModel'); 
const db = require('../../../data/db-config')

/** 
 * @function getWaypointsByJourneyId
 * @description returns a list of waypoints for the given journey
 * @param {Object} token - the user's token
 * @param {String} token.sub - the user id
 * @param {String} journey_id - the id of the journey 
 * @returns {Promise<Array>} - a list of waypoints for the given journey
*/
async function getWaypointsByJourneyId(token, journey_id) {
    try{
        await journeyModel.validateJourneyOwnership(token, journey_id);
        return db('waypoints').where({journey_id});
    }catch(e){
        throw new Error('you do not have access to this device')
    }
}

/** 
 * @function addWaypoint
 * @description adds a new waypoint to the database
 * @param {String} device_secret the secret associated with the device
 * @param {Object} waypoint - the new waypoint to be added
 * @param {String} waypoint.time
 * @param {Number} waypoint.lat
 * @param {Number} waypoint.lon
 * @param {String} [waypoint.label]
 * @param {Boolean} [isNew=false] - whether the waypoint is a new one or not. Determines if the 
 * new waypoint should be added to an existing journey or create a new one.
 * @returns {Promise<Object>} - the newly created waypoint | rejects if there is no device with the given secret
*/
async function addWaypoint(device_secret,{lat,lon,time,label},isNew){
    try{
        let {device_id} = await deviceModel.validateDeviceSecret(device_secret);
        if(isNew){
            let newJourney = await journeyModel.createJourney(device_secret,label);
            let journey_id = newJourney.journey_id;
            return db('waypoints').insert({journey_id,lat,lon,time});
        }else{
            let {journey_id} = await journeyModel.getJourneysByDevice(device_secret).first();
            return db('waypoints').insert({journey_id,lat,lon,time});
        }
    }catch(e){
        throw new Error('you do not have access to this device'); 
    }
}

module.exports = {
    getWaypointsByJourneyId,
    addWaypoint,
}