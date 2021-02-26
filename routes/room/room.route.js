const express = require('express');
const router = express.Router();
const roomController = require('./room.controller')
const { hasRole, isAdmin, verifyToken } = require("../../middleware/authentication");


router.post("/getRoomsByHotel", [verifyToken], roomController.getRoomsByHotel);
router.post("/getVacantRoomsByHotel", [verifyToken], roomController.getVacantRoomsByHotel);
router.post("/getRoomByRoomNumber", [verifyToken], roomController.getRoomByRoomNumber);

module.exports = router