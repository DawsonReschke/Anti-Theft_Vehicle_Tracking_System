/** 
 * Api
 * @module routes/api
 */

const express = require('express'); 

const router = express.Router(); 

const device = require('./device/deviceRouter'); 
const journey = require('./journey/journeyRouter')
const waypoint = require('./waypoint/waypointRouter')

router.use('/devices',device)
router.use('/waypoints',waypoint)
router.use('/journeys',journey)

/** 
 * @name SanityCheck
 * @path {GET} /api
 * @code {200} Success
 * @response {String} message=api_up
 */
router.get('/',(req,res,next)=>{
    res.status(200).json({message:'api up'})
})

module.exports = router;