const express = require('express');
const router = express.Router();
const hotelController = require('./hotel.controller')

/**
 *  @swagger
 *  /hotel:
 *    get:
 *      summary: Gets all hotels
 *      description: Gets all hotels
 *      responses:
 *        200:
 *          description: A list of hotels
 *          content:
 *            application/json:
 *              schema:
 *                type: Object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: Name of the hotel
 *                    example: John's Hotel
 *                  streetName:
 *                    type: string
 *                    description: Name of the street
 *                    example: Johnvej
 *                  houseNumber:
 *                    type: number
 *                    description: The streenumber
 *                    example: 1
 *                  zip:
 *                    type: number
 *                    description: Zip code of the hotels location
 *                    example: 8000
 *                  rooms:
 *                    type: array
 *                    items:
 *                      type: number
 *                      example: [0, 1, 2]
 *
 *
 */
router.get('', hotelController.getHotels)
router.post('', hotelController.addHotel)
router.get('/:name', hotelController.getHotel)

module.exports = router

