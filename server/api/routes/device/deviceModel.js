const db = require('../../../data/db-config')

/** 
 * @function validateDeviceOwnerShip 
 * @description returns a device if the user owns it
 * @param {Object} token - user token
 * @param {String} token.sub - user id
 * @param {String} deviceId - device id
 * @returns {Promise<Object>} - device | rejects if the device does not exist or if the user does not own it 
*/
async function validateDeviceOwnerShip(token, deviceId){
    let device = db('devices').where({user_id: token.sub, device_id: deviceId}).first();
    if(!device) throw new Error('Device does not exist');
    return device; 
}

/** 
 * @function validateDeviceSecret
 * @description returns a device if there exists a device with the same secret
 * @param {String} device_secret 
 * @returns {Promise<Object>} - device | rejects if the device does not exist
*/
async function validateDeviceSecret(device_secret){
    let device = await db('devices').where({device_secret}).first();
    if(!device) throw new Error('Device does not exist');
    return device; 
}

/** 
 * @function validateDeviceId
 * @description returns a device if there exists a device with the same device id
 * @param {String} device_id 
 * @returns {Promise<Object>} - device | rejects if the device does not exist
*/
async function validateDeviceId(device_id){
    let device = await db('devices').where({device_id}).first();
    if(!device) throw new Error('Device does not exist');
    return device; 
}

/** 
 * @function getDevices
 * @description returns all devices that belong to the given user
 * @param {Object} token - user token
 * @param {String} token.sub - user id
 * @returns {Promise<Array>} - array of devices 
*/
async function getDevices(token){
    return db('devices').where({user_id: token.sub});
}

/** 
 * @function createDevice
 * @description creates and inserts a device into the database
 * @param {Object} token - user token
 * @param {String} token.sub - user id
 * @param {String} device.name - device name
 * @returns {Promise<Object>} - device | rejects if a device already exists with the same name (under that user)
*/
async function createDevice(token, device_name){
    let alreadyExists = await db('devices').where({user_id: token.sub, device_name}).first();
    if(alreadyExists) throw new Error('A device with that name already exists');
    return db('devices').insert({user_id: token.sub, device_name,device_secret:crypto.randomBytes(8).toString('hex')}); 
}

/** 
 * @function resetDeviceSecret
 * @description resets the device secret key for the given device
 * @param {Object} token - user token
 * @param {String} token.sub - user id
 * @param {String} deviceId - device id
 * @returns {Promise<Object>} - device | rejects if the device does not exist or if the user does not own it 
*/
async function resetDeviceSecret(token, deviceId){
    let updated = await db('devices').where({user_id: token.sub, device_id: deviceId}).update({device_secret:crypto.randomBytes(8).toString('hex')}); 
    if(!updated) throw new Error('You do not have access to this device');
    return updated;
}




module.exports = {
    validateDeviceOwnerShip,
    validateDeviceSecret,
    validateDeviceId,
    getDevices,
    createDevice,
    resetDeviceSecret
}