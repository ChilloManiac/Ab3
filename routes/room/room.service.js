const Hotel = require("../../models/hotel");

async function getAllVacantRooms() {
  const hotels = await Hotel.find();
  return hotels.flatMap((hotel) =>
    hotel.rooms
      .map((room) => ({
        roomNumber: room.roomNumber,
        numberOfBeds: room.numberOfBeds,
        isOccupied: room.isOccupied,
        hotelName: hotel.name,
      }))
      .filter((room) => !room.isOccupied)
  );
}

module.exports = {
  getAllVacantRooms,
};
