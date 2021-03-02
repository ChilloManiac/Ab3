const express = require("express");
const router = express.Router();
const hotelController = require("./hotel.controller");
const { verifyToken, hasRole } = require("../../middleware/authentication");
const { Roles } = require("../../utilities/role.utility");

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
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                      description: Name of the hotel
 *                      example: John's Hotel
 *                    streetName:
 *                      type: string
 *                      description: Name of the street
 *                      example: Johnvej
 *                    houseNumber:
 *                      type: number
 *                      description: The streenumber
 *                      example: 1
 *                    zip:
 *                      type: number
 *                      description: Zip code of the hotels location
 *                      example: 8000
 *                    owner:
 *                      type: string
 *                      description: Id of the manager that created the hotel
 *                      example: 6030e3dcf3a24c21c8aa5ff1
 *                    rooms:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          roomNumber:
 *                            type: number
 *                            description: The number of the room
 *                            example: 42
 *                          numberOfBeds:
 *                            type: number
 *                            description: The amount of sleeping spaces in a room
 *                            example: 4
 *                          isOccupied:
 *                            type: boolean
 *                            description: True if the room is already occupied
 *                            example: true
 *    post:
 *      summary: Create a hotel
 *      description: Create a hotel if you are a manager
 *      requestBody:
 *        description: AAAAAAAAAAAAAAAAAAAAAA
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                hotelName:
 *                  type: string
 *                  required: true
 *                  description: Name of the hotel
 *                  example: Hotel Hallojsa
 *                streetName:
 *                  type: string
 *                  required: true
 *                  description: Name of the street
 *                  example: Hallojsa Vej
 *                houseNumber:
 *                  type: number
 *                  required: true
 *                  example: 123
 *                  description: Housenumber on the street
 *                zip:
 *                  type: number
 *                  required: true
 *                  example: 8000
 *                  description: Zip number for the adress
 *      responses:
 *        201:
 *          description: A newly created hotel
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: Name of the hotel
 *                    example: Hotel Hallojsa
 *                  streetName:
 *                    type: string
 *                    description: Name of the street
 *                    example: Hallojsa Vej
 *                  houseNumber:
 *                    type: number
 *                    description: The streenumber
 *                    example: 123
 *                  zip:
 *                    type: number
 *                    description: Zip code of the hotels location
 *                    example: 8000
 *                  owner:
 *                    type: string
 *                    description: Username of the manager that created the hotel
 *                    example: Don John Johnson
 *                  rooms:
 *                    type: array
 *                    example: []
 *                    items:
 *                      type: object
 *                      properties:
 *                        roomNumber:
 *                          type: number
 *                          description: The number of the room
 *                          example: 42
 *                        numberOfBeds:
 *                          type: number
 *                          description: The amount of sleeping spaces in a room
 *                          example: 4
 *                        isOccupied:
 *                          type: boolean
 *                          description: True if the room is already occupied
 *                          example: true
 *        400:
 *          description: Bad request - Will be thrown if values are missing
 *        401:
 *          description: Unauthorized - Will be thrown if the user is not logged in (Bearer token)
 *        403:
 *           description: Forbidden - Will be thrown if the user is not in the 'manager' role
 *
 */

router.get("", hotelController.getHotels);
router.post("", hotelController.addHotel);
/**
 *  @swagger
 *  /hotel/{name}:
 *    get:
 *      summary: Get a hotel
 *      description: Gets a specific hotel from a name
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: Name of the hotel
 *      responses:
 *        200:
 *          description: A hotel
 *          content:
 *            application/json:
 *              schema:
 *                type: object
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
 *                  owner:
 *                    type: string
 *                    description: Username of the manager that created the hotel
 *                    example: Don John Johnson
 *                  rooms:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        roomNumber:
 *                          type: number
 *                          description: The number of the room
 *                          example: 42
 *                        numberOfBeds:
 *                          type: number
 *                          description: The amount of sleeping spaces in a room
 *                          example: 4
 *                        isOccupied:
 *                          type: boolean
 *                          description: True if the room is already occupied
 *                          example: true
 */
router.get("", [verifyToken], hotelController.getHotels);
router.post(
  "",
  [verifyToken, hasRole(Roles.Manager)],
  hotelController.addHotel
);
router.post(
  "/room",
  [verifyToken, hasRole(Roles.Manager)],
  hotelController.addRoom
);
router.get("/:name", [verifyToken], hotelController.getHotel);

module.exports = router;
