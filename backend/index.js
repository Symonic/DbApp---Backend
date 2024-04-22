require('dotenv').config()
//const util = require('util')
const cors = require('cors')
const express = require('express')
const app = express()


// DATABASE
const {ConnectDB} = require('./Database/ConnectDB')

// ROUTERS
const LoginRouter = require('./Routes/AuthRouter')

// CORS SETTINGS
var corsOptions = {
    origin: 'https://db-app-backend-y6wj.vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// MIDDLEWARE
app.use(express.json())
app.use(cors(corsOptions))

// PATHS
app.use('/auth', LoginRouter)



const PORT = process.env.SERVER_PORT | 3000
ConnectDB().then(
    app.listen(PORT, () => {console.log(`Server is listening on port ${PORT} ...`)})
)

module.exports = {corsOptions}



