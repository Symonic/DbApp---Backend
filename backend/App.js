require('dotenv').config()
//const util = require('util')

const express = require('express')
const app = express()

// DATABASE
const {ConnectDB} = require('./Database/ConnectDB')

// ROUTERS
const LoginRouter = require('./Routes/AuthRouter')

// MIDDLEWARE
app.use(express.json())

// PATHS
app.use('/auth', LoginRouter)


const PORT = process.env.SERVER_PORT | 3000
ConnectDB().then(
    app.listen(PORT, () => {console.log(`Server is listening on port ${PORT} ...`)})
)




