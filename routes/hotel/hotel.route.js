const express = require('express');
const router = express.Router();
const hotelController = require('./hotel.controller');
const { verifyToken, hasRole } = require("../../middleware/authentication");
const {Roles} = require("../../utilities/role.utility")

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
router.get('', [verifyToken], hotelController.getHotels)
router.post('', [verifyToken, hasRole(Roles.Manager)], hotelController.addHotel)
router.post('/room', [verifyToken, hasRole(Roles.Manager)], hotelController.addRoom)
router.get('/:name', [verifyToken], hotelController.getHotel)

module.exports = router

