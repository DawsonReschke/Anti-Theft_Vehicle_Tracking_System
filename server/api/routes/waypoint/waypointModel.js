/** 
 * Database interface for interfacing with the `plots` table
 * @module models/waypoint
 */

const db = require('../../../data/db-config')


/** 
 *@todo get waypoints from given journey
 *
*/ 
async function getWaypointsByJourneyId(token, journeyId) {
    throw new Error('get waypoints from given journey not implemented yet')
}

/** 
 *@todo add a new waypoint to the database
 *
*/ 
async function addWaypoint(waypoint){
    throw new Error('add a new waypoint to the database not implemented yet')
}

/** 
 *@todo add a new journey to the database
 *
*/ 
async function addJourney(waypoint){
    throw new Error('add a new journey to the database not implemented yet')
}

// /** 
//  * 
//  * @function getMostRecentTripId 
//  * @description returns the most recent trip for a specific device_id
//  * @param {String} device_id Unique identifier for the device
//  * @returns {Promise} Resolves to most recent trip
//  */
// const getMostRecentTripId = (device_id) =>{
//     return db('trips')
//         .select('trip_id')
//         .where('device_id',device_id)
//         .orderBy('trip_id','desc')
//         .first()
// }

// /** 
//  * 
//  * @function getPlotsByTripId 
//  * @description returns all of the plots in a specific trip
//  * @param {String} trip_id Unique identifier for the trip
//  * @returns {Promise} resolves to a list of points containing all of GPS points
//  */
// const getPlotsByTripId = (trip_id) => {
//     return db('plots').where('trip_id',trip_id)
// }

// /** 
//  * 
//  * @function addTrip 
//  * @description Creates a new database entry containing the device id and start/end_time
//  * @param {Object} gpsData 
//  * @param {String} gpsData.device_id Unique identifier for the device adding the point and trip
//  * @param {Data} gpsData.time Time when the GPS data was collected
//  * @returns {Promise} resolves to an array containing one object with trip_id for the new 
//  */
// const addTrip = (gpsData) => {
//     return db('trips').insert({
//         'device_id':gpsData.device_id,
//         'start_time':gpsData.time,
//         'end_time':gpsData.time
//     }).returning('trip_id')
// }

// /** 
//  * 
//  * @function addPlot 
//  * @description Creates a new database entry containing the gps data. If gpsData.isNew then add a new trip in the `trips` database.
//  * @param {Object} gpsData
//  * @param {String} gpsData.device_id Unique identifier for the device adding the point and trip
//  * @param {Boolean} gpsData.isNew If isNew create a new trip to contain the GPS data
//  * @param {Data} gpsData.time Time when the GPS data was collected
//  * @param {Number} gpsData.latitude 
//  * @param {Number} gpsData.Longitude 
//  * @returns {Promise}
//  */
// const addPlot = async (gpsData) => {
//     let trip_id =
//     gpsData.isNew ?
//      (await addTrip(gpsData))[0].trip_id :
//      (await getMostRecentTripId(gpsData.device_id)).trip_id
//     return db('plots').insert({
//         latitude:gpsData.latitude,
//         longitude:gpsData.longitude,
//         time:gpsData.time,
//         trip_id
//     })
// }


module.exports = {
    getMostRecentTripId,
    getPlotsByTripId,
    addTrip,
    addPlot
}