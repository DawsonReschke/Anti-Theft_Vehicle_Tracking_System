const express = require('express'); 
const model = require('./locationModel')

const router = express.Router(); 

/** 
* Test Data 
*/
const EXAMPLE_TRIP = require('./trip.json')
const EXAMPLE_TRIP_LIST = require('./tripList.json')


/** 
* GET /trips/:deviceID | returns a list of trips contained in the DB for the given deviceId
*/
router.get('/trips/:deviceId',async(req,res,next) => {
    const deviceId = req.params.deviceId; 
    let trips = await model.getTripsByDeviceId(deviceId); 
    if(!trips.length) return next({
            status:404,
            message:`There are no trips recorded for device: ${deviceId}`
        })
    res.json({trips})
})

/** 
* GET /trip:tripId | returns a list of GPS data for a given trip  
*/
router.get('/trip/:tripId',async(req,res,next) => {
    const tripId = req.params.tripId;
    let trip = await model.getPlotsByTripId(tripId)
    if(!trip.length) return next({
        status:404,
        message: `The trip with id ${tripId} does not exist.`
    })
    res.json({
        locations:trip
    })
})

/** 
* Sanity Check 
*/
router.get('/', async (req,res,next) => { 
    res.json({message:'up'})
})


module.exports = router;