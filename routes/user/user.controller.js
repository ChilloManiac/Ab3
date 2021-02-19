const userService = require('./user.service')

function getWorld(req, res, next) {
    userService.HelloWorld().then((world) => res.json(world))
}


module.exports = {
    getWorld
}
