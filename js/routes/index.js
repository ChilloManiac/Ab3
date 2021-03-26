var express = require('express');
var router = express.Router();
const userRouter = require('./user/user.route')
const hotelRouter = require('./hotel/hotel.route')
const roomRouter = require('./room/room.route')

router.use('/user', userRouter)
router.use('/hotel', hotelRouter)
router.use('/room', roomRouter)

module.exports = router;
