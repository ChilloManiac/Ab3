const express = require('express');
const router = express.Router();
const roomController = require('./room.controller')

router.post("/getRoomsByHotel", [verifyToken], roomController.getRoomsByHotel);
router.post("/getVacantRoomsByHotel", [verifyToken], roomController.getVacantRoomsByHotel);
router.post("/getRoomByRoomNumber", [verifyToken], roomController.getRoomByRoomNumber);
router.post("/createRoom", [verifyToken], roomController.createRoom);
router.post("/markRoomAsVacant", [verifyToken], roomController.markRoomAsVacant);
router.post("/markRoomAsOccupied", [verifyToken], roomController.markRoomAsOccupied);
router.post("/getHotelByName", [verifyToken], roomController.getHotelByName);

module.exports = router