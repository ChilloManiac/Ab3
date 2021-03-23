const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  numberOfBeds: { type: Number, required: true },
  isOccupied: { type: Boolean, required: true },
  seaView: {type: Boolean, default: false},
  miniBar: {type: Boolean, default: true},
  numberOfRestrooms: {type: Number, default: 1}
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  streetName: { type: String, required: true },
  houseNumber: { type: Number, required: true },
  zip: { type: Number, required: true },
  rooms: { type: [roomSchema], required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);
