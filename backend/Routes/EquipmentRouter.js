const express = require('express')
const Router = express.Router()


// CONTROLLERS
const AvailableEqController = require('../Controllers/EquipmentControllers/AvailableEqController')
const EquipmentViewController = require('../Controllers/EquipmentControllers/EquipmentViewController')
const RentedEqController = require('../Controllers/EquipmentControllers/RentedEqController')
const RentEqController = require('../Controllers/EquipmentControllers/RentEqController')
const ReturnEqController = require('../Controllers/EquipmentControllers/ReturnEqController')

// MIDDLEWARE
const authenticateToken = require('../Middleware/authenticateToken')



// ROUTES
Router.get('/', authenticateToken, EquipmentViewController)
Router.get('/available', authenticateToken, AvailableEqController)
Router.get('/rented', authenticateToken, RentedEqController)
Router.patch('/rent/:id', authenticateToken, RentEqController)
Router.patch('/return/:id', authenticateToken, ReturnEqController)

module.exports = Router