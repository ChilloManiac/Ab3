const roomService = require("./room.service");
const { HttpError } = require("../../middleware/errorHandler");

function getAllVacantRooms(req, res, next) {
  roomService
    .getAllVacantRooms()
    .then((rooms) => res.status(200).send(rooms))
    .catch((error) => next(error));
}

module.exports = {
  getAllVacantRooms,
};
