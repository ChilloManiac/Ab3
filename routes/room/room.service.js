const { HttpError } = require("../../middleware/errorHandler");
const Hotel = require("../../models/hotel");


async function getAllVacantRooms(){
    const hotels = await Hotel.find()
    hotels.map((hotel)=>hotel.rooms
            .map((room)=>({...room, hotelName:hotel.name})))
        .filter((roomUnion)=>roomUnion.isOccupied===false)
    return hotels.reduce((acc, hotel)=>acc.concat(hotel.rooms.filter((room)=>room.isOccupied == false)))
}

module.exports = {
    getAllVacantRooms
}
