const express = require('express'); 
const model = require('./tripModel')

const router = express.Router(); 

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
* Parses a string in this format: {boolean},{bigInt},{float},{float}
* returns {
    isNew,
    time,
    latitude,
    longitude
}
*/
function parseGPSString(str){
    const parsedString = str.split(','); 
    return{
        isNew:Boolean(Number(parsedString[0])),
        time:new Date(Number(parsedString[1])),
        latitude:Number(parsedString[2]),
        longitude:Number(parsedString[3])
    }
}


/** 
* POST /gps:deviceId | expected payload text: '{boolean}isNew,{bigInt}time,{float}lat,{float}long'
* Adds to the database the GPS data from the payload.  
*/
router.post('/gps/:deviceId',async (req,res,next)=>{
    const device_id = req.params.deviceId; 
    const gpsData = parseGPSString(req.body);
    try {
        const inserted = await model.addPlot({...gpsData,device_id});
        res.status(200).send('OK'); 
    } catch (error) {
        next({status:500,message:'an error has occurred'})
    }
})

/** 
* Sanity Check 
*/
router.get('/', async (req,res,next) => { 
    res.json({message:'up'})
})


module.exports = router;