const { HttpError } = require("../../middleware/errorHandler");
const hotelService = require('./hotel.service')

const getHotels = (req, res, next) => {
    hotelService
        .getHotels()
        .then((hotels) => res.status(200).json(hotels))
        .catch((error) => next(error))
}

const addHotel = (req, res, next) => {
    const {hotelName, streetName, houseNumber, zip} = req.body;
    if(!hotelName || !streetName || !houseNumber || !zip) {
        throw new HttpError(400, "hotelName, streetName, houseNumber or zip missing")
    }
    hotelService
        .addHotel(hotelName, streetName, houseNumber, zip)
        .then((hotel) => res.status(200).send(hotel))
        .catch((error) => next(error))
}

const getHotel = (req, res, next) => {
    const {name} = req.param;
    hotelService
        .getHotel(name)
        .then((hotel) => res.status(200).send(hotel))
        .catch((error) => next(error))
}

module.exports = {
    getHotels,
    getHotel,
    addHotel,
}
