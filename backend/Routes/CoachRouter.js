const express = require('express')
const Router = express.Router()


// CONTROLLERS
const CoachLaunchViewController = require('../Controllers/CoachControllers/CoachLaunchViewController')
const CreateNewPlayerTokenController = require('../Controllers/CreateUserControllers/CreateNewPlayerTokenController')
const UserListController = require('../Controllers/CoachControllers/UserListController.js')
const UserIdViewDataController = require('../Controllers/CoachControllers/UserViewDataController.js') 

const GetPlayerStatistics  = require('../Controllers/CoachControllers/UserViewStatisticController.js') 
const UserUpdatePlayerStatistics = require('../Controllers/CoachControllers/UserUpdatePlayerStatistics.js') 
const UserViewEquipmentController = require('../Controllers/CoachControllers/UserViewEquipmentController')
const NotificationEditController = require('../Controllers/CoachControllers/NotificationEditController.js')
const EquipmentAddController = require('../Controllers/CoachControllers/EquipmentAddController.js')
const  EquipmentDeleteController = require('../Controllers/CoachControllers/EquipmentDeleteController.js')
const   TeamStatisticEditController = require('../Controllers/CoachControllers/TeamStatisticEditController.js')

const checkNewPlayerTokenController = require('../Controllers/CreateUserControllers/CheckNewPlayerTokenController.js')
const CheckIfUserExistsController = require('../Controllers/CreateUserControllers/CheckIfUserExistsController.js')
const CreateNewPlayerController = require('../Controllers/CreateUserControllers/CreateNewPlayerController.js')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')
const authenticateCoach = require('../Middleware/authenticateCoach')

// ROUTES


Router.get('/', authenticateToken, authenticateCoach, CoachLaunchViewController)
Router.get('/getCreatePlayerToken', authenticateToken, authenticateCoach, CreateNewPlayerTokenController)
Router.get('/list',authenticateToken,authenticateCoach,UserListController)
Router.get('/statistic',authenticateToken,authenticateCoach,GetPlayerStatistics)
Router.get('/data',authenticateToken,authenticateCoach,UserIdViewDataController)
//Router.get('/equipment/rented',authenticateToken,authenticateCoach,UserViewEquipmentController)
Router.post('/check', checkNewPlayerTokenController)
Router.get('/list',authenticateToken,authenticateCoach, UserListController)
Router.post('/checkUser', CheckIfUserExistsController)
Router.post('/create/:token', CreateNewPlayerController)

Router.post('/statistic/update', authenticateToken,authenticateCoach,UserUpdatePlayerStatistics)
Router.post('/notification/update', authenticateToken,authenticateCoach,NotificationEditController)
Router.post('/equipment/update', authenticateToken,authenticateCoach,EquipmentAddController)
Router.delete('/equipment/delete/:id', authenticateToken,authenticateCoach,EquipmentDeleteController)
Router.post('/teamstatistic/update', authenticateToken,authenticateCoach,TeamStatisticEditController)

module.exports = Router