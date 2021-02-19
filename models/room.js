const mongoose = require("mongoose");
    
const roomSchema = new mongoose.Schema({
    RoomNumber: { type: Number, required: true },
    NumberOfBeds: { type: Number, required: true },
    IsOccupied: { type: Boolean, required: true }
});
const Room = mongoose.model('room', roomSchema);
Room.createIndexes();

module.exports = Room;