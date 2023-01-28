const NODE_ENV = process.env.NODE_ENV
const errorHandlerMiddleWare = (error,req,res,next) => {
    console.log('\x1b[31m',`${JSON.stringify(error.error)}`,'\x1b[0m')
    if(!error.status) {
        if(NODE_ENV === 'development'){
            res.status(500); 
            res.json(error.stack);
            return; 
        }
        res.status(500); 
        res.json({message:'an error has occurred'})
    }
    res.status(error.status);
    res.json({message: error.message})
}


module.exports = errorHandlerMiddleWare; 