const express = require('express'); 
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
    res.json({
        trips:EXAMPLE_TRIP_LIST.trips
    })
})

/** 
* GET /trip:tripId | returns a list of GPS data for a given trip  
*/
router.get('/trip/:tripId',async(req,res,next) => {
    res.json({
        locations:EXAMPLE_TRIP.trips.filter((trip) => trip.trip_id == req.params.tripId)[0]?.trip
    })
})

/** 
* Sanity Check 
*/
router.get('/', async (req,res,next) => { 
    res.json({message:'up'})
})


module.exports = router;