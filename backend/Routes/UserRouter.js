const express = require('express')
const Router = express.Router()


// CONTROLLERS
const UserStatsViewController = require('../Controllers/UserControllers/UserStatsViewController')
const UserInfoController = require('../Controllers/UserControllers/UserInfoController')
const UserStatisticsController = require('../Controllers/UserControllers/UserStatisticsController')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')

// ROUTES
Router.get('/', authenticateToken, UserStatsViewController)
Router.get('/info', authenticateToken, UserInfoController)
Router.get('/statistics', authenticateToken,UserStatisticsController)




module.exports = Router