/** 
 * Defines the (currentDevice & the list of user owned devices)
 */

import { createReducer } from '@reduxjs/toolkit'

/** 
 * @typedef {Object} Device data associated with a particular device
 * @property {String} device_id 
 * @property {String} deviceName User defined name for a device 
 * @property {Trip[]} trips list of trip objects that the user can select from to view.  
*/

/** 
 * @constant {Object} initialState portion of the initial state of the application
 * @property {Device} currentDevice where the user selected device will be stored (if the user only has a single device we will store that one initially) 
 * @property {Device[]} availableDevices list of Devices that the user owns (we start by requesting all user devices then the user can select a device from the list or will auto select the only) 
*/
const initialState = {
    currentDevice: {}, 
    availableDevices:[],
}

const reducer = createReducer(initialState,{
    setUserDevices: (state,action) => {
        // if there is only one item automatically use that as the selected device. 
        if(action.payload.length === 1){ 
            state.currentDevice = action.payload[0]; 
        }
        state.availableDevices.push(action.payload); 
    },
    setSelectedDevice: (state,action) =>{
        state.currentDevice = action.payload
    }
})

export default reducer; 