const express = require('express'); 
const routes = require('./routes');
const notFound = require('./middlewares/notFoundMiddleWare');
const errorHandler = require('./middlewares/errorHandlerMiddleWare');

const app = express(); 
app.use(routes);
app.use(errorHandler);
app.use(notFound);



module.exports = app; 