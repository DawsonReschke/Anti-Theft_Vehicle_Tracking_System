const express = require('express'); 

const router = express.Router(); 

/** 
* Import all of the routes 
*/
const location = require('./trip/tripRouter')

/** 
* Use all of the routes 
*/
router.use('/location',location)

module.exports = router;