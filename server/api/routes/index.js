const express = require('express'); 
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
*/

router.get('/',async (req,res,next) => { 
    res.json({message:'api up'});
})


module.exports = router;