/** 
 * @module authReducer
 * @description all auth related redux thunks and reducers
*/

import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { createMatcher } from './utils'
import authClient from '../authClient'


/** 
 * @typedef {Object} ActionMatcher 
 * @description Reducer matcher (replaces the old switch method) these are useful for matching the action type by string
 * commonly used as the reducer functions for async thunks.
 * @property {String | Function | Action} matcher A Function, Action, or String that is used to determine if the reducer should run on any given action.
 * @property {Function} reducer the reducer function to run if there is a match.
*/

/** 
 * @typedef {Function} SelectorFunction
 * @description this type of function is passed into the `useSelector` hook from redux. 
 * @example let authState = useSelector(selectAuth); each time you reference authState you will always receive the current authentication state. 
 * @param {Object} state the current state of the application
 * @returns a portion of the current state.  
*/

/** 
 * Checks the user authentication state stores in state as (state.auth.isAuthenticated)  
*/
export const authenticate = createAsyncThunk(
    'authenticate',
    async(_,{getState}) => {
        let {isAuthenticated} = getState().auth
        return isAuthenticated || await authClient.isAuthenticated(); 
    }
)

/** 
 * @constant {SelectorFunction} selectAuth selects the isAuthenticated section of state
 * @param {Object} state current State of the application 
 * @returns {Boolean} the current user authentication state in the application. 
*/
export const selectAuth = state => state.auth.isAuthenticated


/** 
 * @constant {ActionMatcher[]} authenticateMatchers 
 * @description matcher object array for reducing the Authenticated state after calling the `authenticate` thunk 
*/

const authenticateMatchers = [
    {
        matcher: createMatcher(authenticate.fulfilled),
        reducer: (state,action)=>{
            state.isAuthenticated = action.payload || false; 
        }
    },
    {
        matcher:createMatcher(authenticate.rejected),
        reducer:(state,action)=>{
            state.error = 'The user could not be authenticated...'
        }
    },
]


/** 
 * Logs in the user and updates the authentication state. 
*/
export const login = createAsyncThunk(
    'login',
    async () => {
        return await authClient.login(); 
    }
)

/** 
 * @constant {ActionMatcher[]} loginMatchers  
 * @description matcher object array for reducing the Authenticated state after calling the `login` thunk 
*/
const loginMatchers = [
    {
        matcher:createMatcher(login.fulfilled),
        reducer: (state,action)=>{
            state.isAuthenticated = action.payload || false;
        }
    },
    {
        matcher:createMatcher(login.rejected),
        reducer: (state,action)=>{
            state.error = 'The user could not be logged in... Try again later.'
        }
    }
]


/** 
 * Logs out the user and stores the authentication state. 
*/
export const logout = createAsyncThunk(
    'logout',
    async () => {
        return await authClient.logout(); 
    }
)

/** 
 * @constant {ActionMatcher[]} logoutMatchers 
 * @description matcher object array for reducing the Authenticated state after calling the `logout` thunk 
*/
const logoutMatchers = [
    {
        matcher:createMatcher(logout.fulfilled),
        reducer: (state,action)=>{
            state.isAuthenticated = action.payload || false;
        }
    },
    {
        matcher:createMatcher(logout.rejected),
        reducer: (state,action)=>{
            state.error = 'The user could not be logged out... Try again later'
        }
    }
]


/** 
 * Fetches and stores user data from auth0. (state.auth.user) 
*/
export const getUserData = createAsyncThunk(
    'getUserData',
    async () => {
        return await authClient.getUser(); 
    }
)

/** 
 * @constant {SelectorFunction} selectUserData returns the user section of state (state.auth.user)
 * @param {Object} state current state of the application 
 * @returns {Object} user data section of state 
*/
export const selectUserData = state => state.auth.userData;

/** 
 * @constant {ActionMatcher[]} getUserDataMatchers 
 * @description matcher object array for reducing the user state after calling the `getUserData` thunk 
*/
const getUserDataMatchers = [
    {
        matcher:createMatcher(getUserData.fulfilled),
        reducer:(state,action) => {
            state.user = action.payload || null; 
        }
    },
    {
        matcher:createMatcher(getUserData.rejected),
        reducer:(state,action) => {
            state.error = 'Could not fetch user data...' 
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
            state.isAuthenticated = action.payload || false; 
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
