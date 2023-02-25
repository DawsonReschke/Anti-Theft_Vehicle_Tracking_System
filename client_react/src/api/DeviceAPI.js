/** 
 * @module DeviceApi 
 * @description Module responsible for getting the list of devices for a specific user.
 * Implements auth0 using getTokenSilently (production) & getTokenWithPopup (development) 
*/
const GET_DEVICE_URI = '/api/v1/devices'; 
const CREATE_DEVICE_URI = '/api/v1/devices/new'; 

/** 
 * @typedef {Object} Error an error containing the api response & HTTP status code
 * @property {String} message the api error message  
 * @property {Number} code status code  
*/

/** 
 * @typedef {Object} Device data associated with a particular device
 * @property {String} device_id 
 * @property {String} deviceName User defined name for a device 
 * @property {Trip[]} trips list of trip objects that the user can select from to view.  
*/

/** 
 * @function requestUserDevices Get the list of user devices from the API 
 * @returns {Device[] | Error} returns either a list of devices or an error object 
*/
async function requestUserDevices(token){
    try{
        let response = await fetch(GET_DEVICE_URI,{
            method: 'GET',
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
        return response.json(); 
    }catch(e){
        return {status: e.response.status,message:e.response.message}
    }
}

/** 
 * @function createUserDevice 
 * @description Creates a new device on the backend and responds with the newly created device. 
 * @param {String} device name of the new device. Can return an error if you have already have a device with that name. 
 * @returns {Device | Error}   
*/
async function createUserDevice(token,device){
    try{
        let response = await fetch(CREATE_DEVICE_URI,{
            method:'POST',
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
        return await response.json(); 
    }catch(e){
        return {status:e.response.status,message:e.response.message}
    }
}