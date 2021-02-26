const mongoose = require("mongoose");
Room = require('./room');

const hotelSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    streetName: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: Number, required: true },
    rooms: {type: [Room], required: true}
});
const Hotel = mongoose.model('Hotel', hotelSchema);
Hotel.createIndexes();

module.exports = Hotel;
