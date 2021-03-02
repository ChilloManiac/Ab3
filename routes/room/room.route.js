const express = require("express");
const router = express.Router();
const roomController = require("./room.controller");
const { verifyToken } = require("../../middleware/authentication");

router.get("/VacantRooms", [verifyToken], roomController.getAllVacantRooms);

module.exports = router;
