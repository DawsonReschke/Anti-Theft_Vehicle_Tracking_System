/** 
 * Defines the current Trip we are analyzing (maybe we can store all of our requested trips here as a cache)
 */

import { createReducer } from '@reduxjs/toolkit'



/** 
 * @typedef {Object} Journey all of the data associated with a particular trip (obtained by calling api with a valid trip_id)
 * @property {String | null} trip_id  
 * @property {String | null} label A user defined label they can use to query the api with. Useful computing on particular trip types for example(how many miles have I driven THIS YEAR, TO AND FROM WORK)   
 * @property {Waypoint[]} waypoints List of GPS data associated with a trip.  
*/

/** 
 * @constant {Journey} initialState
*/

const initialState = {
    trip_id:null,
    label:null,
    waypoints:[],
    error: null,
}

const reducer = createReducer(initialState,{
    setJourney: (state,{payload}) =>{
        state.trip_id = payload.trip_id
        state.label = payload.label
        state.waypoints = payload.waypoints
    },
    
})


export default reducer; 