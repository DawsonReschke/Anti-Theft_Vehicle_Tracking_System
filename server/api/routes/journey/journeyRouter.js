/** 
 * Routes dedicated to interfacing with the 'trips' database
 * @module routes/api/journey
 */

const express = require('express'); 
const journeyRouter = require('./journeyModel')

const router = express.Router(); 


/** 
 * GET /api/journeys/:device_id
 * @summary Get all journeys for a specific device
 * @security BearerAuth
 * @param {String} device_id.path.required
 * @returns {Array<Object>} 200 - OK - application/json - list of journeys
 * @returns {Object} 403 - Forbidden - application/json
*/
router.get('/:device_id',async (req,res,next) => {
    const {device_id} = req.params
    const token = req.body; // !change to req.headers.authorization
    try{
        let journeys = await journeyRouter.getJourneysByDevice(token,device_id);
        res.json(journeys)
    }catch(e){
        next({status:403,message:e.message})
    }
})

/** 
 * PUT /api/journeys/:device_id
 * @summary Update a journey label in the database
 * @security BearerAuth
 * @param {String} label.body.required - label of the journey
 * @returns {Object} 200 - OK - application/json - updated journey
 * @returns {Object} 403 - Forbidden - application/json
*/
router.put('/:journey_id',async(req,res,next) => {
    const token = req.body; //! change to req.headers.authorization
    const {label} = req.body;
    const {journey_id} = req.params
    try{
        let journey = await journeyRouter.labelJourney(token,journey_id,label);
        res.json(journey)
    }catch(e){
        next({status:403,message:e.message})
    }
})

/** 
 * DELETE /api/journeys/:journey_id
 * @summary delete a journey from the database
 * @security BearerAuth
 * @param {String} journey_id.path.required - id of the journey to be deleted 
 * @returns {Object} 200 - OK - application/json - deleted journey
 * @returns {Object} 403 - Forbidden - application/json
*/
router.delete('/:journey_id',async(req,res,next) => {
    const {journey_id} = req.params;
    const token = req.body; //! change to req.headers.authorization
    try{
        let journey = await journeyRouter.deleteJourney(token,journey_id);
        res.json(journey)
    }catch(e){
        next({status:403,message:e.message})
    }
})

module.exports = router;