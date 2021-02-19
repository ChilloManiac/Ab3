const express = require('express');
const router = express.Router();
const userController = require('./user.controller')

/*
 * @swagger
 * /user:
 *  get:
 *    description: asd
 */
router.get('', userController.getWorld)

module.exports = router
