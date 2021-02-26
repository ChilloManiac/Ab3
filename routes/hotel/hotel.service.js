const Hotel = require('../../models/hotel')
const { HttpError } = require("../../middleware/errorHandler");

const getHotels = async () => {
    return Hotel.find({});
}

const getHotel = async (hotelName) => {
    return Hotel.findOne({hotelName});
}

const addHotel = async (hotelName, streetName, houseNumber, zip) => {
    const hotel = new Hotel({
        hotelName,
        streetName,
        houseNumber,
        zip,
        rooms: []
    });
    try {
        return await hotel.save();
    } catch (error) {
        throw new HttpError(400, "Hotel already exists")
    }
}

module.exports = {
    getHotels,
    getHotel,
    addHotel,
}
