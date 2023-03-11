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

/** 
 *@todo get a list of journeys for a given device_id
 *
*/ 
async function getJourneysByDevice(device_id){
    throw new Error('get a list of journeys for a given device_id not implemented yet')
    return db('trips').select('trip_id','start_time','end_time').where('device_id',device_id)
}

/** 
 *@todo label a journey
 *
*/ 

async function labelJourney(journey_id,label){
    throw new Error('label a journey not implemented yet')
}

/** 
 *@todo delete a journey
 *
*/ 
async function deleteJourney(journey_id){
    throw new Error('delete a journey not implemented yet')
}

module.exports = {
    getJourneysByDevice,
    labelJourney,
    deleteJourney,
}