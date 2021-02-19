const express = require('express');
const router = express.Router();
const hotelController = require('./hotel.controller')

router.get('', hotelController.getWorld)

module.exports = router
