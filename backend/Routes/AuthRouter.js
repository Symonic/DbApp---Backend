const express = require('express')
const Router = express.Router()

const jwt = require('jsonwebtoken')

// CONTROLLERS
const LoginController = require('../Controllers/LoginController')
const TestTokenController = require('../Controllers/TestTokenController')
const RefreshTokenController = require('../Controllers/RefreshTokenController')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')

Router.get('/test', authenticateToken, TestTokenController)
Router.post('/token', LoginController)
Router.post('/refresh_token', RefreshTokenController)



module.exports = Router
