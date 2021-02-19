const hotelService = require('./hotel.service')


function getWorld(req, res, next) {
    hotelService.HelloWorld().then((world) => res.json(world))
}


module.exports = {
    getWorld
}
