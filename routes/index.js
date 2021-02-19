var express = require('express');
var router = express.Router();
const userRouter = require('./user/user.route')

router.use('/user', userRouter)

module.exports = router;
