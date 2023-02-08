/** 
 * Api
 * @module routes/api
 */

const express = require('express'); 

const router = express.Router(); 

const journey = require('./journeys/journeyRouter')
const waypoint = require('./waypoints/waypointRouter')

router.use('/waypoint',waypoint)
router.use('/journey',journey)

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