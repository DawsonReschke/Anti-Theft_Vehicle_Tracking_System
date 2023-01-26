const notFound = (req,res,next) => {
    res.status(404); 
    res.json({message: 'Sorry the route you have requested does not exist.'})
}

module.exports = notFound