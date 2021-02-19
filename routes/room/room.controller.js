const roomService = require('./room.service')


function getWorld(req, res, next) {
    roomService.HelloWorld().then((world) => res.json(world))
}


module.exports = {
    getWorld
}
