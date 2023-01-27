const express = require('express'); 
const path = require('path');

const router = express.Router(); 

/** 
* Import all of the routes 
*/
const location = require('./location/locationRouter')

/** 
* Use all of the routes 
*/
router.use('/location',location)

/** 
* GET / route 
* Serve static files for frontend
*/
router.use('/',express.static(path.join(__dirname,'../../../client/dist')))


module.exports = router;