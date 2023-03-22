/** 
 * Routes
 * @module routes
 */

const express = require('express'); 
const path = require('path');
const routes = require('./routes');
const notFound = require('./middlewares/notFoundMiddleWare');
const errorHandler = require('./middlewares/errorHandlerMiddleWare');

const app = express(); 
app.use(express.json());
// app.use(express.text({type(req){return true}}))
app.use('/api',routes);


/** 
 * Get index.html
 * Serve static files 
 * @name Base
 * @path {GET} /
 * @response Load Static Files
 */
app.use('/',express.static(path.join(__dirname,'../../client/dist')))
app.use(errorHandler);
app.use(notFound);



module.exports = app; 