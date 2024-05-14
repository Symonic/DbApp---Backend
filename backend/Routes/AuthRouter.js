const express = require('express')
const Router = express.Router()


// CONTROLLERS
const LoginController = require('../Controllers/LoginControllers/LoginController.js')
const TestTokenController = require('../Controllers/LoginControllers/TestTokenController.js')
const RefreshTokenController = require('../Controllers/LoginControllers/RefreshTokenController.js')
const RemindPasswordController = require('../Controllers/LoginControllers/RemindPasswordController.js')
const ResetPasswordController = require('../Controllers/LoginControllers/ResetPasswordController.js')
const TestModelController = require('../Controllers/LoginControllers/TestModelController.js')
const RevokeTokenController = require('../Controllers/LoginControllers/RevokeTokenController.js')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')


// ROUTES
Router.get('/test', authenticateToken, TestTokenController)
Router.post('/token', LoginController)
Router.post('/refresh_token', RefreshTokenController)
Router.post('/revoke_token', RevokeTokenController)
Router.post('/remind_password', RemindPasswordController)
Router.post('/reset_password/:token', ResetPasswordController)
Router.get('/test_model', TestModelController)



module.exports = Router
