const { HttpError } = require("../../middleware/errorHandler");
const Hotel = require("../../models/hotel");


async function getAllVacantRooms(){
    const hotels = await Hotel.find()
    return hotels
      .flatMap((hotel) => 
        hotel.rooms.map((room) => ({...room, hotelName: hotel.name})
      .filter((room) => !room.isOccupied)))
}

module.exports = {
    getAllVacantRooms
}
