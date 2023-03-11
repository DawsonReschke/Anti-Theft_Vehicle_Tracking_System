const db = require('../../../data/db-config')

/** 
 *@todo get user devices
 *
*/ 
async function getDevices(token){
    throw new Error('get user devices not implemented yet')
}

/** 
 *@todo get a device if the user owns it
 * 
*/ 
async function getDevice(token, deviceId){
    throw new Error('get a device if the user own not implemented yet')
}

/** 
 *@todo create a device
 *
*/ 
async function createDevice(token, device){
    throw new Error('create not implemented yet');
}

/** 
 *@todo reset device secret key
 *
*/ 
async function resetDeviceSecret(token, deviceId){
    throw new Error('reset device secret key not implemented yet')
}


module.exports = {
    getDevices,
    getDevice,
    createDevice,
    resetDeviceSecret
}