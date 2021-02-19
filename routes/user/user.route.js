const express = require('express');
const router = express.Router();
const userController = require('./user.controller')

/**
 *  @swagger
 *  /user:
 *    get:
 *      summary: Hello world endpoint
 *      description: Temporary hello world endpoint for testing purposes
 *      responses:
 *          description: A string
 *          content: application/json
 */
router.get('', userController.getWorld)

module.exports = router
