const mongoose = require("mongoose");
    
const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    numberOfBeds: { type: Number, required: true },
    isOccupied: { type: Boolean, required: true }
});
const Room = mongoose.model('room', roomSchema);
Room.createIndexes();

module.exports = Room;