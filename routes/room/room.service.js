const Hotel = require("../../models/hotel");

async function getAllVacantRooms() {
  const rooms = await getAllRooms();
  return rooms.filter((room) => !room.isOccupied);
}

async function getAllRooms() {
  const hotels = await Hotel.find();
  return hotels.flatMap((hotel) =>
    hotel.rooms.map((room) => ({
      roomNumber: room.roomNumber,
      numberOfBeds: room.numberOfBeds,
      isOccupied: room.isOccupied,
      hotelName: hotel.name,
    }))
  );
}

module.exports = {
  getAllVacantRooms,
  getAllRooms,
};
