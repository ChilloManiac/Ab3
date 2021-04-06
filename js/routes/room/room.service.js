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

async function reserveRoom(hotelName, roomNumber) {
  const hotel = await Hotel.findOne({name: hotelName});
  if (!hotel)
    throw "Hotel not found"
  const room = hotel.rooms.find((r) => r.roomNumber === roomNumber);
  if (!room)
    throw "Room not found"
  if (room.isOccupied)
    throw "Room already occupied"
  room.isOccupied = true;
  await hotel.save();
}

module.exports = {
  getAllVacantRooms,
  getAllRooms,
  reserveRoom,
};
