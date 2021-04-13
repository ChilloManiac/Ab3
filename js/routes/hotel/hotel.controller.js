const {HttpError} = require("../../middleware/errorHandler");
const hotelService = require("./hotel.service");

const getHotels = (req, res, next) => {
  hotelService
    .getHotels()
    .then((hotels) => res.status(200).json(hotels))
    .catch((error) => next(error));
};

const addHotel = (req, res, next) => {
  const {hotelName, streetName, houseNumber, zip} = req.body;
  if (!hotelName || !streetName || !houseNumber || !zip) {
    throw new HttpError(
      400,
      "hotelName, streetName, houseNumber or zip missing"
    );
  }
  const verifiedUser = req.verifiedUser;
  if (!verifiedUser) {
    throw new HttpError(403, "Token not verified.");
  }

  hotelService
    .addHotel(hotelName, streetName, houseNumber, zip, verifiedUser)
    .then((hotel) => res.status(201).send(hotel))
    .catch((error) => next(error));
};

const getHotel = (req, res, next) => {
  const {name} = req.params;
  if (!name) {
    throw new HttpError(400, "Hotelname missing.");
  }

  hotelService
    .getHotel(name)
    .then((hotel) => res.status(200).send(hotel))
    .catch((error) => next(error));
};

const addRoom = (req, res, next) => {
  const {name} = req.params;
  const {roomNumber, numberOfBeds, isOccupied} = req.body;
  if (!name || !roomNumber || !numberOfBeds || isOccupied === undefined) {
    throw new HttpError(400, "Hotelname, roomNumber, isOccupied or numberOfBeds missing.");
  }
  const verifiedUser = req.verifiedUser;
  if (!verifiedUser) {
    throw new HttpError(403, "Token not verified.");
  }

  hotelService
    .addRoom(name, roomNumber, {numberOfBeds, isOccupied}, verifiedUser)
    .then((room) => res.status(200).send(room))
    .catch((error) => next(error));
};

const getVacantRooms = (req, res, next) => {
  const {name} = req.params;
  if (!name) {
    throw new HttpError(400, "Name missing.");
  }

  hotelService
    .getVacantRooms(name)
    .then((rooms) => res.status(200).send(rooms))
    .catch((error) => next(error));
};

const updateRoom = (req, res, next) => {
  const {name, roomNumber} = req.params;
  const {numberOfBeds, isOccupied} = req.body;

  if (!name || !roomNumber || !numberOfBeds || !isOccupied) {
    throw new HttpError(
      400,
      "Hotelname, roomNumber, numberOfBeds or isOccupied is missing."
    );
  }

  hotelService
    .updateRoom(name, {numberOfBeds, isOccupied}, roomNumber)
    .then((room) => res.status(200).send(room))
    .catch((error) => next(error));
};

const getRoomByRoomNumber = (req, res, next) => {
  const {name, roomNumber} = req.params;
  if (!name || !roomNumber) {
    throw new HttpError(400, "Hotelname or roomNumber is missing.");
  }

  hotelService
    .getRoomByRoomNumber(name, roomNumber)
    .then((room) => res.status(200).send(room))
    .catch((error) => next(error));
};

const reserveRoom = (req, res) => {
  const {name, roomNumber} = req.params;
  const request = {
    roomNumber: parseInt(roomNumber),
    hotelName: name,
  }
  req.mq.sendToQueue('reservations', Buffer.from(JSON.stringify(request)))
  res.status(200).send('OK')
}

module.exports = {
  getHotels,
  getHotel,
  addHotel,
  addRoom,
  getVacantRooms,
  getRoomByRoomNumber,
  updateRoom,
  reserveRoom,
};
