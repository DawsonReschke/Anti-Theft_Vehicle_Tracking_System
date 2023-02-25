import deviceReducer from './deviceReducer'
import tripReducer from './tripReducer'


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
    trip:tripReducer
}

export default rootReducer;  