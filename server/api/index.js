const express = require('express'); 
const routes = require('./routes')
const notFound = require('./middlewares/notFoundMiddleWare')

const app = express(); 
app.use(routes)
app.use(notFound)



module.exports = app; 