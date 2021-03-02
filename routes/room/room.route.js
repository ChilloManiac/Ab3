const express = require("express");
const router = express.Router();
const roomController = require("./room.controller");
const {
  hasRole,
  isAdmin,
  verifyToken,
} = require("../../middleware/authentication");

router.get("/VacantRooms", [verifyToken], roomController.getAllVacantRooms);

module.exports = router;
