import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import authClient from '../authClient'

/** 
 * @typedef {Object} ActionMatcher 
 * @description Reducer matcher (replaces the old switch method) these are useful for matching the action type by string
 * commonly used as the reducer functions for async thunks.
 * @property {String | Function | Action} matcher A Function, Action, or String that is used to determine if the reducer should run on any given action.
 * @property {Function} reducer the reducer function to run if there is a match.
*/

export const authenticate = createAsyncThunk(
    'authenticate',
    async(_,{getState}) => {
        let {isAuthenticated} = getState().auth
        return isAuthenticated || await authClient.isAuthenticated(); 
    }
)

export const selectAuth = state => state.auth.isAuthenticated


/** 
 * @constant {ActionMatcher[]} authenticateMatchers  
*/
const authenticateMatchers = [
    {
        matcher:authenticate.fulfilled,
        reducer:(state,action)=>{
            state.isAuthenticated = action.payload || false; 
        }
    },
    {
        matcher:authenticate.rejected,
        reducer:(state,action)=>{
            state.error = action.payload || null;
        }
    },
]


export const login = createAsyncThunk(
    'login',
    async () => {
        return await authClient.login(); 
    }
)

/** 
 * @constant {ActionMatcher[]} loginMatchers  
*/
const loginMatchers = [
    {
        matcher:login.fulfilled,
        reducer: (state,action)=>{
            state.isAuthenticated = action.payload || false;
        }
    },
    {
        matcher:login.rejected,
        reducer: (state,action)=>{
            state.error = action.payload || null;
        }
    }
]

export const logout = createAsyncThunk(
    'logout',
    async () => {
        console.log('logout thunk')
        return await authClient.logout(); 
    }
)

/** 
 * @constant {ActionMatcher[]} logoutMatchers  
*/
const logoutMatchers = [
    {
        matcher:logout.fulfilled,
        reducer: (state,action)=>{
            state.isAuthenticated = action.payload || false;
        }
    },
    {
        matcher:logout.rejected,
        reducer: (state,action)=>{
            state.error = action.payload || null;
        }
    }
]


export const getUserData = createAsyncThunk(
    'getUserData',
    async () => {
        return await authClient.getUser(); 
    }
)

export const selectUserData = state => state.auth.userData;

/** 
 * @constant {ActionMatcher[]} getUserDataMatchers  
*/
const getUserDataMatchers = [
    {
        matcher:getUserData.fulfilled,
        reducer:(state,action) => {
            if(action.payload instanceof Error){
                state.error = action.payload
            }else{
                state.user = action.payload || null; 
            }
        }
    },
    {
        matcher:getUserData.rejected,
        reducer:(state,action) => {
            state.error = action.payload || null; 
        }
    },
]

/** 
 * @constant initialState 
 * @property {Boolean} isAuthenticated user auth status (are they logged in)
 * @property {Object} user data related to the users profile such as name,email,profile_img
 */
const initialState = { 
    isAuthenticated:false, 
    user:null,
    error:null,
}

const reducer = createReducer(initialState,{
        setIsAuth:(state,action) => {
            state.isAuthenticated = action.payload
        },
        setUser:(state,action) => {
            state.client = action.payload
        },
        setError:(state,action) => {
            state.error = action.payload
        },
    },
    [
        ...authenticateMatchers,
        ...getUserDataMatchers,
        ...loginMatchers,
        ...logoutMatchers
    ]
    
)

export default reducer; 
