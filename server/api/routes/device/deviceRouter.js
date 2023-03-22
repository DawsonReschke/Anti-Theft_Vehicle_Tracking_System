const express = require('express'); 
const deviceModel = require('./deviceModel'); 

const router = express.Router(); 

/** 
 * GET /api/devices
 * @tags devices
 * @summary Get the list of user owned devices.
 * @security BearerAuth
 * @returns {Array<Device>} 200 - OK - application/json
 * @returns {Object} 500 - Internal Server Error - application/json
*/
router.get('/', async (req, res, next) =>{
    let token = req.body; // change this to req.payload after we add the auth0 token parser middleware
    try{
        let devices = await deviceModel.getDevices(token);
        return res.status(200).json(devices);
    }catch(err){
        next({status:500,message:'Sorry, something went wrong'});
    }
});

/** 
 * POST /api/devices/create
 * @tags devices
 * @summary Create a new device using the user supplied device name. 
 * @security BearerAuth
 * @param {String} device_name.body.required
 * @returns {Object} 200 - OK - application/json
 * @returns {Object} 400 - Bad Request - application/json
*/
router.post('/create',async (req,res,next)=>{
    let {device_name} = req.body;
    let token = req.body; // change this to req.payload after we add the auth0 token parser middleware
    try {
        let createdDevice = await deviceModel.createDevice(token,device_name)
        res.json(createdDevice); 
    } catch (e) {
        next({status:400,message:e.message});
    }
});


/** 
 * PUT /api/devices/reset/:device_id
 * @summary Regenerate the device secret key.
 * @security BearerAuth
 * @param {String} device_id.path.required
 * @returns {Object} 200 - OK - application/json
 * @returns {Object} 403 - Forbidden - application/json  
*/
router.put('/reset/:device_id',async (req, res, next)=>{
    let {device_id} = req.params;
    let token = req.body; 
    try {
        let updatedDevice = await deviceModel.resetDeviceSecret(token,device_id);
        res.json(updatedDevice);
    } catch (e) {
        next({status:403,message:e.message});
    }
});

/** 
 * PUT /api/devices/rename/:device_id
 * @summary Update the device name
 * @security BearerAuth
 * @param {String} device_id.path.required
 * @param {String} device_name.body.required
 * @returns {Object} 200 - OK - application/json
 * @returns {Object} 400 - Bad request - application/json - when the device name is already in use 
 * @returns {Object} 403 - Forbidden - application/json - when the user does not have permission to change the device name
*/
router.put('/rename/:device_id',async (req, res, next) =>{
    let {device_id} = req.params;
    let {device_name, ...token} = req.body; 
    try{
        let renamed = await deviceModel.renameDevice(token,device_id,device_name);
        res.json(renamed); 
    }catch({message}){
        if(message === 'A device with that name already exists') return next({status:400,message:message})
        if(message === 'You do not have access to this device') return next({status:403,message:message})
        return next({status:500,message:'Internal Server Error'})
    }
});

/** 
 * DELETE /api/devices/delete/:device_id
 * @summary Delete the given device.
 * @security BearerAuth
 * @param {String} device_id.path 
 * @returns {Object} 200 - OK - application/json - deleted device
 * @returns {Object} 403 - Forbidden - application/json  
*/

router.delete('/delete/:device_id',async (req, res, next)=>{
    let {device_id} = req.params;
    let token = req.body;
    try {
        let deletedDevice = await deviceModel.deleteDevice(token,device_id);
        res.json(deletedDevice);
    } catch (e) {
        next({status:403,message:e.message});
    }
}); 

module.exports = router;
