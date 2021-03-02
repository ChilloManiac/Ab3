const Hotel = require("../../models/hotel");
const { HttpError } = require("../../middleware/errorHandler");

const getHotels = async () => {
  return Hotel.find({});
};

const getHotel = async (hotelName) => {
  const hotel = await Hotel.findOne({ name: hotelName });
  if (!hotel) {
    throw new HttpError(400, `Hotel ${hotelName} does not exist.`);
  } else {
    return hotel;
  }
};

const addRoom = async (hotelName, roomNumber, numberOfBeds, verifiedUser) => {
  const hotel = await getHotel(hotelName);
  if (verifiedUser._id == hotel.owner) {
    const room = {
      roomNumber: roomNumber,
      numberOfBeds: numberOfBeds,
      isOccupied: false,
    };
    hotel.rooms.push(room);
    try {
      return await hotel.save();
    } catch (error) {
      throw new HttpError(400, "Roomnumber already exists.");
    }
  } else {
    throw new HttpError(403, "Access denied.");
  }
};

const addHotel = async (
  hotelName,
  streetName,
  houseNumber,
  zip,
  verifiedUser
) => {
  const hotel = new Hotel({
    name: hotelName,
    streetName,
    houseNumber,
    zip,
    rooms: [],
    owner: verifiedUser._id,
  });
  try {
    return await hotel.save();
  } catch (error) {
    throw new HttpError(400, "Hotel already exists");
  }
};

async function getVacantRooms(hotelName) {
  const hotel = await getHotel(hotelName);
  return hotel.rooms.map((rooms) => !room.isOccupied);
}

async function getRoomByRoomNumber(hotelName, roomNumber) {
  const hotel = await getHotel(hotelName);
  let room = hotel.rooms.map((room) => room.roomNumber == roomNumber);
  if (!room) {
    throw new HttpError(400, "Room does not exist.");
  }
  return room;
}

async function markRoomAsVacant(hotelName, roomNumber) {
  const hotel = await getHotel(hotelName);
  const room = await hotel.rooms.findOne({ roomNumber: roomNumber });
  if (!room) {
    throw new HttpError(400, `Room ${roomNumber} does not exist in ${hotel}`);
  }
  room.isOccupied = false;
  try {
    newRoom = await room.save();
    return {
      roomNumber: newRoom.roomNumber,
      numberOfBeds: newRoom.numberOfBeds,
      isOccupied: newRoom.isOccupied,
    };
  } catch (error) {
    throw new HttpError(400, `Couldn't save room ${roomNumber} in ${hotel}`);
  }
}

async function markRoomAsOccupied(hotelName, roomNumber) {
  const hotel = await getHotel(hotelName);
  const room = await hotel.rooms.findOne({ roomNumber: roomNumber });
  // Insert error check
  room.isOccupied = true;
  try {
    newRoom = await room.save();
    return {
      roomNumber: newRoom.roomNumber,
      numberOfBeds: newRoom.numberOfBeds,
      isOccupied: newRoom.isOccupied,
    };
  } catch {
    throw new HttpError(400, `Couldn't save room ${roomNumber} in ${hotel}`);
  }
}

module.exports = {
  getHotels,
  getHotel,
  addHotel,
  addRoom,
  getVacantRooms,
  getRoomByRoomNumber,
  markRoomAsVacant,
  markRoomAsOccupied,
};
