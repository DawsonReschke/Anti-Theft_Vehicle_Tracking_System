import deviceReducer from './deviceReducer'
import tripReducer from './tripReducer'
import authReducer from './authReducer'

/** 
 * State looks like this State:{
 *      device: {
 *          currentDevice:
 *          ...
 *      } 
 *      trip:{
 *          trip_id:
 *          ...
 *      }
 * } 
*/

const rootReducer = {
    device:deviceReducer,
    trip:tripReducer,
    auth:authReducer
}

export default rootReducer;  