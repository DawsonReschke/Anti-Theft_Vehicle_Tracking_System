/** 
 * @typedef {Object} Waypoint Single point on the map GPS data
 * @property    {Number} lat latitude portion of the coordinate 
 * @property    {Number} lon longitude portion of the coordinate 
 * @property    {Date} time when the coordinate was captured 
*/

/** 
 * @typedef {Object} Journey all of the data associated with a particular trip (obtained by calling api with a valid trip_id)
 * @property {String} trip_id  
 * @property {String} label A user defined label they can use to query the api with. Useful computing on particular trip types for example(how many miles have I driven THIS YEAR, TO AND FROM WORK)   
 * @property {Waypoint[]} waypoints List of GPS data associated with a trip.  
*/

/** 
 * @typedef {Object} Trip data associated with a trip excluding the waypoints (we load the waypoints once a particular trip is selected)
 * @property {String} trip_id
 * @property {String} device_id
 * @property {Date} start_date
 * @property {String} duration 
 * @property {String} label 
*/

/** 
 * @typedef {Object} Device data associated with a particular device
 * @property {String} device_id 
 * @property {String} deviceName User defined name for a device 
 * @property {Trip[]} trips list of trip objects that the user can select from to view.  
*/

/** 
 * @typedef {Object} Error an error containing the api response & HTTP status code
 * @property {String} response the api response  
 * @property {Number} code status code  
*/

exports.unused = {};