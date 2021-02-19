const express = require('express');
const router = express.Router();
const roomController = require('./room.controller')

router.get('', roomController.getWorld)

module.exports = router
