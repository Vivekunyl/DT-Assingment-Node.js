/**
 * @file This File contains the basic declaration for route End-points
 */

/**
 * Express Module
 * @const
 */
const express = require('express')
//Using Router() method to get to a specific end point with HTTP request
const router = express.Router();
/**
 * @require {multer}
 * @const
 */
const multer = require('../middlewares/multer');
/**
 * acquiring Controllers module for routes functionalities
 * @const
 */
const controller = require("../controllers/mainController");

/**
 * Route for Home Page
 * @method GET
 * @module main_controller
 */
router.get('/',controller.getHome);

/**
 * Route to get a specific event or an array of events for Pagination
 * @method GET
 * @module main_controller
 */
router.get('/api/v3/app/events',controller.getEventById);

/**
 * Route to Post Event on Database
 * @method POST
 * @module main_controller
 */
router.post('/api/v3/app/events',multer.array('file'),controller.postEvent);

/**
 * Route to Update a specific event by its _id in Database
 * @method PUT
 * @module main_controller
 */
router.put('/api/v3/app/events',multer.array('file'),controller.putEvent);

/**
 * Route to Delete a specific event by its _id in Database
 * @method DELETE
 * @module main_controller
 */
router.delete('/api/v3/app/events',controller.deleteEvent);

/**
 * @exports main_routes
 */
module.exports = router;