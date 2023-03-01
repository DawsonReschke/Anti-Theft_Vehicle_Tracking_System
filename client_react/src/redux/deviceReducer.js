/** 
 * @module deviceReducer
 * @description all device related redux thunks and reducers 
*/

import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import {createMatcher} from './utils'
import authClient from '../authClient'

/** 
 * @typedef {Object} Device data associated with a particular device
 * @property {String} device_id 
 * @property {String} deviceName User defined name for a device 
 * @property {Trip[]} trips list of trip objects that the user can select from to view.  
*/


/** 
 * fetches the list of devices associated with the specific user 
 * Utilizing createAuthenticatedRequest from authClient. 
*/
export const getDevices = createAsyncThunk(
    'getDevices',
    async () => {
        try {
            return await authClient.createAuthenticatedRequest({
                url:'/journey'
            })
        } catch (e) {
            return new Error('Could not fetch user devices.')
        }
    }
)

const getDeviceMatchers = [
    {
        matcher:createMatcher(getDevices.fulfilled),
        reducer: (state,action) => {
            if(action.payload instanceof Error){
                state.error = action.payload; 
            }else{
                state.availableDevices = action?.payload?.devices || []; 
            }
        }
    },
    {
        matcher:createMatcher(getDevices.rejected),
        reducer: (state,action) => {
            if(action.payload instanceof Error){
                state.error = action.payload; 
            }else{
                state.error = action?.payload || null; 
            }
        }
    }
]

export const createDevice = createAsyncThunk(
    'createDevice',
    async (device_name) => { 
        try {
            return await authClient.createAuthenticatedRequest({
                url:'/devices',
                data:{
                    device_name
                }
            })
        } catch (e) {
            return new Error(`Could not create a new device with name: ${device_name}.`)
        }
    }
)


/** 
 * @constant {Object} initialState portion of the initial state of the application
 * @property {Device} currentDevice where the user selected device will be stored (if the user only has a single device we will store that one initially) 
 * @property {Device[]} availableDevices list of Devices that the user owns (we start by requesting all user devices then the user can select a device from the list or will auto select the only) 
*/
const initialState = {
    currentDevice: {}, 
    availableDevices:[],
}

const reducer = createReducer(initialState,
    {
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
    },
    [
        ...getDeviceMatchers,
    ]
)

export default reducer; 