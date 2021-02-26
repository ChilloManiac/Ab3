const { HttpError } = require("../../middleware/errorHandler");
const Hotel = require("../../models/hotel");


async function getHotelByName(hotelName){
    hotel = Hotel.findOne({hotelName});
    if (!hotel) {
        throw new HttpError(400, `Hotel ${hotelName} does not exist.`);
    }
}

async function getRoomsByHotel(hotelName) {
    const hotel = await getHotelByName(hotelName);
    return hotel.rooms;
}

async function getVacantRoomsByHotel(hotelName) {
    const hotel = await getHotelByName(hotelName);
    return hotel.rooms.map(rooms => !room.isOccupied);        
}

async function getRoomByRoomNumber(hotelName, number) {
    const hotel = await getHotelByName(hotelName);
    let room = hotel.rooms.map(room => room.roomNumber == number);
    if (!room) {
        throw new HttpError(400, "Room does not exist.");
    }
    return room;
}

async function createRoom(hotelName,room) {
    const newRoom = new Room({
        roomNumber : room.roomNumber,
        numberOfBeds : room.numberOfBeds,
        isOccupied : room.isOccupied
    })
    
    let hotel = await getHotelByName(hotelName);
    
    hotel.rooms.push(newRoom)
    try {
        await hotel.save()
        return {
            roomNumber : newRoom.isOccupied,
            numberOfBeds : newRoom.numberOfBeds,
            isOccupied : newRoom.isOccupied
        };
    }
    catch (error){
        throw new HttpError(400, `Couldn't save new room in ${hotelName}`);
    }
}

async function markRoomAsVacant(hotelName, roomNumber){
    const hotel = await getHotelByName(hotelName);
    const room = await hotel.rooms.findOne({roomNumber : roomNumber})
    if (!room) {
        throw new HttpError(400, `Room ${roomNumber} does not exist in ${hotel}`)
    }
    room.isOccupied = false;
    try{
        newRoom = await room.save()
        return {
            roomNumber : newRoom.roomNumber,
            numberOfBeds : newRoom.numberOfBeds,
            isOccupied : newRoom.isOccupied
        }
    } catch (error){
        throw new HttpError(400, `Couldn't save room ${roomNumber} in ${hotel}`)
    }
}

async function markRoomAsOccupied(hotelName, roomNumber){
    const hotel = await getHotelByName(hotelName);
    const room = await hotel.rooms.findOne({roomNumber : roomNumber})
    // Insert error check
    room.isOccupied = true;
    try{
        newRoom = await room.save();
        return {
            roomNumber : newRoom.roomNumber,
            numberOfBeds : newRoom.numberOfBeds,
            isOccupied : newRoom.isOccupied
        }; 
    }
    catch{
        throw new HttpError(400, `Couldn't save room ${roomNumber} in ${hotel}`)
    }
}

module.exports = {
    getRoomsByHotel,
    getVacantRoomsByHotel,
    createRoom,
    markRoomAsVacant,
    markRoomAsOccupied,
    getHotelByName
}
