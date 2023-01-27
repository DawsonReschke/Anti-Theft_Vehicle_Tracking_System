require('dotenv')
const app = require('./api')
const PORT = process.env.PORT | 1337
app.listen(PORT,()=>{
    console.log('Listening on port:','\x1b[31m',`${PORT}`,'\x1b[0m')
})