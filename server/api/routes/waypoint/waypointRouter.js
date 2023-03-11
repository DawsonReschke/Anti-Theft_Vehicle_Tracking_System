/**
 * Routes dedicated to interfacing with the database containing GPS coordinates
 * @module routes/api/waypoint
 */

/** 
 * Important GPS data to be stored in the database.
 * @typedef {Object} GpsData
 * @property {Boolean} isNew Indicates whether the data being sent is part of an existing trip.
 * @property {Date} time When the time was captured.
 * @property {Number} latitude 
 * @property {Number} longitude 
*/

const express = require('express'); 
const model = require('./waypointModel')

const router = express.Router(); 

/** 
 *@todo get all waypoints for a journey
 *
*/ 
router.get('/:journeyId', async (req, res,next) => {
    throw new Error('get all waypoints for a journey not implemented yet')
})

/** 
 *@todo post a new waypoint
 *
*/ 
router.post('/:secret', async (req, res,next) => {
    throw new Error('post a new waypoint not implemented yet')
})


module.exports = router; 

// /** 
//  * Get the entire list of waypoints for a specific journey.
//  *  
//  * @name GetTrip
//  * @path {GET} /api/waypoints/:tripId
//  * @query {String} :tripId is the unique identifier for the trip.
//  * @code {200} Success
//  * @code {404} Not Found
//  * @code {401} Unauthorized Request
//  * @response {Object[]} waypoints
//  * @response {Date} waypoints[].time Time
//  * @response {Number} waypoints[].latitude Latitude
//  * @response {Number} waypoints[].longitude Longitude
//  */
// router.get('/:tripId',async(req,res,next) => {
//     const tripId = req.params.tripId;
//     let trip = await model.getPlotsByTripId(tripId)
//     if(!trip.length) return next({
//         status:404,
//         message: `The trip with id ${tripId} does not exist.`
//     })
//     res.status(200).json({
//         locations:trip
//     })
// })



// /** 
//  * Validate the object contains all required data, and removes all unnecessary keys
//  * 
//  * @function validateGpsData
//  * @param {Object} gpsData
//  * @param {Boolean} gpsData.isNew
//  * @param {Date} gpsData.time
//  * @param {Number} gpsData.latitude
//  * @param {Number} gpsData.longitude
//  */
// const validateGpsData = ({isNew,time,latitude,longitude} = gpsData) =>{
//     if(!isNew || !time || !latitude || !longitude) throw new Error(`${JSON.stringify(gpsData,null,4)}\n Object does not contain the required fields: isNew,time,latitude,longitude:: Boolean,Date,Number,Number`)
//     return {isNew,time,latitude,longitude}
// }

// /** 
//  * Post a coordinate to be stored in the database with the device_id property set to :deviceId.
//  * 
//  * @name AddCoordinate
//  * @path {POST} /api/waypoints/:deviceId
//  * @query {String} :deviceId is the unique identifier for the posting device 
//  * @body {Boolean} isNew Does the coordinate mark a new trip
//  * @body {Date} time Time that the coordinate was captured
//  * @body {Number} latitude Latitude 
//  * @body {Number} longitude Longitude
//  * @code {200} Success
//  * @code {422} Unprocessable Entity
//  * @code {500} Internal Server Error
//  * @response {String} OK=G|B Responds with G (good) or B (bad) no other information 
//  * @chain removeHeadersMiddleware
//  */
// router.post('/:deviceId',removeHeadersMiddleware, async (req,res,next)=>{
//     const device_id = req.params.deviceId; 
//     let gpsData; 
//     try{gpsData = validateGpsData(req.body)}catch(e){next({status:422})}
//     try{
//         const inserted = await model.addPlot({...gpsData,device_id});
//         res.end(); 
//     }catch (error) {
//         next({status:500,message:'an error has occurred',error})
//     }
// })

