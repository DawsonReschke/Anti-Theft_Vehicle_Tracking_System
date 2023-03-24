/** 
 * Database interface for interfacing with the 'trips' table
 * @module models/journey
 */

const deviceModel = require('../device/deviceModel');
const db = require('../../../data/db-config')

/** 
 * @function validateJourneyOwnership
 * @description returns the journey if the user owns the device associated with the journey
 * @param {Object} token - the user's token
 * @param {String} token.sub - the user id
 * @param {String} journey_id - the journey id
 * @returns {Promise<Object>} the journey | rejects if the user does not own the device or the journey does not exist 
*/
async function validateJourneyOwnership(token,journey_id){
    try{
        let journey = await db('journeys').where({journey_id}).first(); 
        if(!journey) throw new Error('You do not have access to this device')
        let {device_id} = journey;
        await deviceModel.validateDeviceOwnerShip(token,device_id); // rejects if the device does not exist or if the user does not have access to the device
        return journey; 
    }catch(e){
        throw new Error('You do not have access to this device');
    }
}

/** 
 * @function getJourneysByDevice
 * @description returns a list of journeys for a given device_id
 * @param {Object} token - the user token
 * @param {String} token.sub - the user id 
 * @param {string} device_id - the device_id of the journey
 * @returns {Promise<Array>} - a list of journeys for a given device_id | rejects if the user does not have access to the device
*/
async function getJourneysByDevice(token,device_id){
    try{
        await deviceModel.validateDeviceOwnerShip(token,device_id); // rejects if the device does not exist or if the user does not have access to the device
        return db('journeys').where({device_id});
    }catch(e){
        throw new Error('You do not have access to this device');
    }
}

/** 
 * @function createJourney
 * @description creates a new journey in the database
 * @param {String} device_id
 * @param {String} label
 * @returns {Promise<Object>} - the newly created journey
*/
async function createJourney(device_id,label){
    try{
        await deviceModel.validateDeviceId(device_id);
        return db('journeys').insert({device_id,label: label || 'default'});
    }catch(e){
        throw new Error('You do not have access to this device');
    }
}

/** 
 * @function labelJourney
 * @description updates the label of a journey
 * @param {Object} token - the user token
 * @param {String} token.sub - the user id 
 * @param {string} journey_id - the id of the journey to label 
 * @param {string} label - the new label of the journey
 * @returns {Promise<Object>} - the updated journey | rejects if the user does not have access to the device or if the journey does not exist
*/
async function labelJourney(token,journey_id,label){
    try{
        let updatedJourney = await db('journeys as j')
            .join('devices as d','j.device_id','d.device_id')
            .where({user_id:token.sub,journey_id})
            .select('j')
            .update({label})
            // .join('devices',{'journeys.device_id':'devices.device_id'})
            // .where({journey_id})
            // .update({label: label || 'default'})
            // .returning('*');
            console.log('herr',updatedJourney)
            if(!updatedJourney.length) throw new Error('You do not have access to this device')
            return updatedJourney;
    }catch(e){
        console.log(e)
        throw new Error('You do not have access to this device');
    }
}

/** 
 * @function deleteJourney
 * @description deletes a journey from the database
 * @param {Object} token - the user token
 * @param {String} token.sub - the user id 
 * @param {string} journey_id - the id of the journey to delete
 * @returns {Promise<Object>} - the deleted journey | rejects if the user does not have access to the device or if the journey does not exist 
*/
async function deleteJourney(token,journey_id){
    try{
        let deletedJourney = await db('journeys')
            .join('devices','journeys.device_id','devices.device_id')
            .where({journey_id})
        let journey = await db('journeys').where({journey_id})
        let device_id = await journey.first().device_id; 
        if(!device_id) throw new Error('You do not have access to this device');
        await deviceModel.validateDeviceOwnerShip(token,device_id); 
        return journey.del();
    }catch(e){
        throw new Error('You do not have access to this device');
    }
}

module.exports = {
    validateJourneyOwnership,
    getJourneysByDevice,
    createJourney,
    labelJourney,
    deleteJourney,
}