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
        let res = await authClient.createAuthenticatedRequest({
            url:'/journeys/example_1'
        })
        return res.data; 
    }
)

const getDeviceMatchers = [
    {
        matcher:createMatcher(getDevices.fulfilled),
        reducer: (state,action) => {
            state.availableDevices = action.payload || null; 
        }
    },
    {
        matcher:createMatcher(getDevices.rejected),
        reducer: (state,action) => {
            state.error = 'Could not retrieve a list of user devices... Try again later.'
        }
    }
]

export const createDevice = createAsyncThunk(
    'createDevice',
    async (device_name) => {
        let res =  await authClient.createAuthenticatedRequest({
            url:'/devices',
            data:{device_name}
        }) 
        return res.data; 
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
    error:null,
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
        },
        setError: (state,action) =>{
            state.error = action.payload || null; 
        }
    },
    [
        ...getDeviceMatchers,
    ]
)

export default reducer; 