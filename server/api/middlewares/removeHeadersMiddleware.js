/** 
 * It is very important for the request and response to be as small as possible to avoid data overages.
 * To reduce response size the headers can be removed.
 * NOTE: this is BAD practice and should not be the final solution as some of these headers are required for HTTP responses
 * With this method we reduce the response size from 200+ bytes to only 20 bytes.
 * 
 * @function removeHeadersMiddleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const removeHeadersMiddleware = (req,res,next) =>{
    res.removeHeader("x-powered-by");
    res.removeHeader("set-cookie");
    res.removeHeader("Date");
    res.removeHeader("Connection");
    res.removeHeader('ETag')
    res.removeHeader('Transfer-Encoding')
    res.writeHead(200)
    next(); 
}

module.exports = removeHeadersMiddleware;