const roomService = require('./room.service');
const { HttpError } = require("../../middleware/errorHandler");

function getRoomsByHotel(req, res, next) {
    if (!req.body.hotel) {
        throw new HttpError(400, "Hotel must be specified.");
      }
      roomService
      .getRoomsByHotel(req.body.hotel)
      .then((response) => res.status(200).send(response))
      .catch((error) => next(error));
}

function getVacantRoomsByHotel(req, res, next) {
    if (!req.body.hotel) {
        throw new HttpError(400, "Hotel must be specified.");
      }
      roomService
      .getVacantRoomsByHotel(req.body.hotel)
      .then((response) => res.status(200).send(response))
      .catch((error) => next(error));
}

function getRoomByRoomNumber(req, res, next) {
    if (!req.body.hotel || req.body.number) {
        throw new HttpError(400, "Hotel and roomnumber must be specified.");
      }
      roomService
      .getRoomByRoomNumber(req.body.hotel, number)
      .then((response) => res.status(200).send(response))
      .catch((error) => next(error));
}


module.exports = {
    getRoomsByHotel,
    getVacantRoomsByHotel,
    getRoomByRoomNumber
}

