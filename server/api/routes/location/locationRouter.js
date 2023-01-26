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
    const deviceId = req.params.deviceId; 
    res.json({
        trips:EXAMPLE_TRIP_LIST.trips
    })
})

/** 
* GET /trip:tripId | returns a list of GPS data for a given trip  
*/
router.get('/trip/:tripId',async(req,res,next) => {
    const tripId = req.params.tripId;
    let trip = EXAMPLE_TRIP.trips.filter((trip) => trip.trip_id == tripId)[0]?.trip;
    if(!trip){
        next({status: 404, message: `The trip with id ${tripId} does not exist.`});
        return; 
    }
    res.json({
        locations: trip
    });
})

/** 
* Sanity Check 
*/
router.get('/', async (req,res,next) => { 
    res.json({message:'up'})
})


module.exports = router;