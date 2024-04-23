const express = require('express')
const Router = express.Router()

const jwt = require('jsonwebtoken')

// CONTROLLERS
const LoginController = require('../Controllers/LoginController')
const TestTokenController = require('../Controllers/TestTokenController')
const RefreshTokenController = require('../Controllers/RefreshTokenController')
const RemindPasswordController = require('../Controllers/RemindPasswordController')
const ResetPasswordController = require('../Controllers/ResetPasswordController')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')


// ROUTES
Router.get('/test', authenticateToken, TestTokenController)
Router.post('/token', LoginController)
Router.post('/refresh_token', RefreshTokenController)
Router.post('/remind_password', RemindPasswordController)
Router.post('/reset_password/:token', ResetPasswordController)



module.exports = Router
