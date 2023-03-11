const express = require('express'); 
const router = express.Router(); 


/** 
 *@todo get user devices
 *
*/ 
router.get('/', function(req, res, next) {
    throw new Error('get user devices not implemented yet')
});

/** 
 *@todo create new device
 *
*/ 
router.post('/',(req,res,next)=>{
    throw new Error('create new de not implemented yet')
});

/** 
 *@todo reset device secret key
 *
*/ 
router.put('/', (req, res, next)=>{
    throw new Error('reset device secret key not implemented yet')
});

module.exports = router;
