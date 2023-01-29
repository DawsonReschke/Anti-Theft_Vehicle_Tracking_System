const express = require('express'); 
const model = require('./tripModel')

const router = express.Router(); 

/** 
 * Get a list of trips for a specific device.
 * 
 * @name Get Trips 
 * @route {GET} /trips/:deviceId
 * @routeparam {String} :deviceId is the unique identifier for the device to get trips for.
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
 * Get the entire list of GPS coordinates for a specific trip.
 * 
 * @route {GET} /trip/:tripId
 * @routeparam {String} :tripId is the unique identifier for the trip.
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
 * Important GPS data to be stored in the database.
 * @typedef {Object} GpsData
 * @property {Boolean} isNew Indicates whether the data being sent is part of an existing trip.
 * @property {Date} time When the time was captured.
 * @property {Number} latitude 
 * @property {Number} longitude 
 */

/** 
 * Parse GPS data from a string.
 * Format of the string: `{Boolean},{Number},{Number},{Number}`.
 * @function parseGPSString
 * @param {String} str 
 * @returns {GpsData} Returns a {@link GpsData} object
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
 * It is very important for the request and response to be as small as possible to avoid data overages.
 * To reduce response size the headers can be removed.
 * NOTE: this is BAD practice and should not be the final solution as some of these headers are required for HTTP responses
 * With this method we reduce the response size from 200+ bytes to only 20 bytes.
 * @function removeHeadersMiddleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Undefined}
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

/** 
 * 
 * @route {POST} /gps/:deviceId
 * @routeparam {String} :deviceId is the unique identifier for the posting device 
 * @bodyparam {String} GpsData in the format `{Boolean} isNew, {Number} time, {Number} lat, {Number} long`
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

module.exports = router;