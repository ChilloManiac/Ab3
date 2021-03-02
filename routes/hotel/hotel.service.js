const Hotel = require("../../models/hotel");
const { HttpError } = require("../../middleware/errorHandler");

const getHotels = async () => {
  return Hotel.find({});
};

const getHotel = async (hotelName) => {
  const hotel = await Hotel.findOne({ name: hotelName });
  if (!hotel) {
    throw new HttpError(400, "Hotel does not exist");
  } else {
    return hotel;
  }
};

const addRoom = async (hotelName, roomNumber, numberOfBeds, verifiedUser) => {
  const hotel = await getHotel(hotelName);
  if (verifiedUser._id == hotel.owner) {
    const room = {
      roomNumber: roomNumber,
      numberOfBeds: numberOfBeds,
      isOccupied: false,
    };
    hotel.rooms.push(room);
    try {
      return Hotel.findByIdAndUpdate(hotel._id, hotel);
    } catch (error) {
      throw new HttpError(400, "Roomnumber already exists.");
    }
  } else {
    throw new HttpError(403, "Access denied.");
  }
};

const addHotel = async (
  hotelName,
  streetName,
  houseNumber,
  zip,
  verifiedUser
) => {
  const hotel = new Hotel({
    name: hotelName,
    streetName,
    houseNumber,
    zip,
    rooms: [],
    owner: verifiedUser._id,
  });
  try {
    return await hotel.save();
  } catch (error) {
    throw new HttpError(400, "Hotel already exists");
  }
};

module.exports = {
  getHotels,
  getHotel,
  addHotel,
  addRoom,
};
