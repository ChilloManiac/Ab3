const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    numberOfBeds: { type: Number, required: true },
    isOccupied: { type: Boolean, required: true }
});

const hotelSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    streetName: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: Number, required: true },
    rooms: {type: [roomSchema], required: true}
});
const Hotel = mongoose.model('Hotel', hotelSchema);
Hotel.createIndexes();

module.exports = Hotel;
