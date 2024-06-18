const express = require('express')
const Router = express.Router()


// CONTROLLERS
const MainViewController = require('../Controllers/AppControllers/MainViewController')
const UserProfileController = require('../Controllers/AppControllers/UserProfileController')
const NotificationController = require('../Controllers/AppControllers/NotificationController')
const TeamStatisticsController = require('../Controllers/TeamStatsControllers/TeamStatisticsController')
const CalendarGetEventController = require('../Controllers/AppControllers/CalendarGetEventController')
// const NotificationEditController = require('../Controllers/AppControllers/NotificationEditController.js')



// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')

// ROUTES
Router.get('/', authenticateToken, MainViewController)
Router.get('/user/profile', authenticateToken, UserProfileController)
Router.get('/team/notification', authenticateToken, NotificationController)
// Router.post('/team/notification/update', authenticateToken,NotificationEditController)

Router.get('/calendar/event', authenticateToken, CalendarGetEventController)








module.exports = Router