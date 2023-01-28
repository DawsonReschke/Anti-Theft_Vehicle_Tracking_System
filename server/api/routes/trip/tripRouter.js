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
* It is very important for the request and response to be a small as possible to avoid data overages. 
* To reduce the response size we can remove all of the headers *NOTE* (this is considered bad practice as many of these headers are required for HTTP requests)
* With this method we can get the response size down to 20b which is very impressive over the default 200+b
*/
const removeHeadersMiddleware = (req,res,next) =>{
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    res.removeHeader('ETag')
    res.removeHeader('Transfer-Encoding')
    res.writeHead(200)
    next(); 
}

/** 
* POST /gps:deviceId | expected payload text: '{boolean}isNew,{bigInt}time,{float}lat,{float}long'
* Adds to the database the GPS data from the payload.  
*/
router.post('/gps/:deviceId',removeHeadersMiddleware, async (req,res,next)=>{
    const device_id = req.params.deviceId; 
    const gpsData = parseGPSString(req.body);
    try {
        const inserted = await model.addPlot({...gpsData,device_id});
        res.end(); 
    } catch (error) {
        next({status:500,message:'an error has occurred',error})
    }
})

/** 
* Sanity Check 
*/
router.get('/', async (req,res,next) => { 
    res.json({message:'up'})
})


module.exports = router;