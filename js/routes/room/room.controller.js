const roomService = require("./room.service");

function getAllVacantRooms(req, res, next) {
  roomService
    .getAllVacantRooms()
    .then((rooms) => res.status(200).send(rooms))
    .catch((error) => next(error));
}


module.exports = {
  getAllVacantRooms
};
