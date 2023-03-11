/** 
 * Routes dedicated to interfacing with the 'trips' database
 * @module routes/api/journey
 */

const express = require('express'); 
const model = require('./journeyModel')

const router = express.Router(); 

/** 
 * Get a list of trips for a specific device.
 * 
 * @name GetTrips 
 * @path {GET} /api/journeys/:deviceId
 * @query {String} :deviceId is the unique identifier for the device to get trips for.
 * @response {Object[]} trips List of trips for a given device_id
 * @response {String} trips[].trip_id Unique identifier for each trip
 * @response {Date} trips[].start_time Time when the trip was started
 * @response {Date} trips[].end_time Time when the trip was ended
 */

/** 
 *@todo get all trips for a device
 *
*/ 
router.get('/:deviceId',async(req,res,next) => {
    throw new Error('get all trips for a device not implemented yet')
    const deviceId = req.params.deviceId; 
    let trips = await model.getTripsByDeviceId(deviceId); 
    if(!trips.length) return next({
            status:404,
            message:`There are no trips recorded for device: ${deviceId}`
        })
    res.json({trips})
})

/** 
 *@todo allow user to label a journey
 *
*/ 
router.put('/:journeyId',async(req,res,next) => {
    throw new Error('allow user to label a journey not implemented yet')
})

/** 
 *@todo delete a journey
 *
*/ 
router.delete('/:journeyId',async(req,res,next) => {
    throw new Error('delete a journey not implemented yet')
})

module.exports = router;