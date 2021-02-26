const express = require('express');
const router = express.Router();
const hotelController = require('./hotel.controller')

router.get('', hotelController.getHotels)
router.post('', hotelController.addHotel)
router.get('/:name', hotelController.getHotel)

module.exports = router

