const mongoose = require("mongoose");
    
const hotelSchema = new mongoose.Schema({
    HotelName: { type: String, required: true },
    StreetName: { type: String, required: true },
    HouseNumber: { type: Number, required: true },
    Zip: { type: Number, required: true },
    
});
const Hotel = mongoose.model('Hotel', hotelSchema);
Hotel.createIndexes();

module.exports = Hotel;