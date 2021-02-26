const roomService = require('./room.service');
const { HttpError } = require("../../middleware/errorHandler");

function getWorld(req, res, next) {
    roomService.HelloWorld().then((world) => res.json(world))
}

function getVacantRoomsByHotel(req, res, next) {
    if (!req.body.hotel) {
        throw new HttpError(400, "Hotel must be specified.");
      }
    roomService.getVacantRoomsByHotel(req.body.hotel);
}


module.exports = {
    getWorld
}
