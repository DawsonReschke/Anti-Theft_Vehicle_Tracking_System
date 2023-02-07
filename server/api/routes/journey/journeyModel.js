/** 
 * Database interface for interfacing with the 'trips' table
 * @module models/journey
 */

const db = require('../../../data/db-config')

/** 
 * 
 * @function getTripsByDeviceId
 * @description gets a list of of trips for a given device_id
 * @param {String} device_id Unique identifier for the device
 * @returns {Promse} Resolves to an array where each object contains a trip_id, start_time, and end_time
 */
const getTripsByDeviceId = (device_id) => {
    return db('trips').select('trip_id','start_time','end_time').where('device_id',device_id)
}


module.exports = {
    getTripsByDeviceId,
}