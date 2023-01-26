const NODE_ENV = process.env.NODE_ENV
const errorHandlerMiddleWare = (error,req,res,next) => {
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