const db = require('../../../data/db-config')

/** 
* return all trip for a given device_id 
*/

const getTripsByDeviceId = (device_id) => {
    return db('trips').select('trip_id','start_time','end_time').where('device_id',device_id)
}

/** 
* returns the most recent trip from a given device_id 
*/

const getMostRecentTripId = (device_id) =>{
    return db('trips')
        .select('trip_id')
        .where('device_id',device_id)
        .orderBy('trip_id','desc')
        .first()
}

/** 
* returns a list of plots for a given trip 
*/

const getPlotsByTripId = (trip_id) => {
    return db('plots').where('trip_id',trip_id)
}

/** 
* when gpsData.isNew create a new trip with the start/end time = gpsData.time 
* and device_id = gpsData.device_id 
*/
const addTrip = (gpsData) => {
    return db('trips').insert({
        'device_id':gpsData.device_id,
        'start_time':gpsData.time,
        'end_time':gpsData.time
    }).returning('trip_id')
}

/** 
* inserts a new plot to the db
* if the new plot is part of an existing trip look up the most recent trip_id.
* otherwise create a new trip and use that trip_id instead.   
*/

const addPlot = async (gpsData) => {
    let trip_id =
    gpsData.isNew ?
     (await addTrip(gpsData))[0].trip_id :
     (await getMostRecentTripId(gpsData.device_id)).trip_id
    return db('plots').insert({
        latitude:gpsData.latitude,
        longitude:gpsData.longitude,
        time:gpsData.time,
        trip_id
    })
}

module.exports = {
    getTripsByDeviceId,
    getMostRecentTripId,
    getPlotsByTripId,
    addTrip,
    addPlot
}