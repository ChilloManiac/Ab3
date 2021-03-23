const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");
const { RoomGql } = require("./types/room-gql");
const { HotelGql } = require("./types/hotel-gql");

const filterType = new GraphQLInputObjectType({
  name: "filter",
  fields: {
    numberOfBeds: {
      type: GraphQLInt,
    },
    vacant: {
      type: GraphQLBoolean,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    rooms: {
      type: new GraphQLList(new GraphQLNonNull(RoomGql)),
      args: { filter: { type: filterType } },
      resolve: async (source, { filter }, { services, verifiedUser }) => {
        const rooms = filter?.vacant
          ? await services.roomService.getAllVacantRooms()
          : await services.roomService.getAllRooms();
        if (!!filter?.numberOfBeds) {
          return rooms.filter(
            (room) => room.numberOfBeds === filter.numberOfBeds
          );
        }
        return rooms;
      },
    },
    hotels: {
      type: new GraphQLList(new GraphQLNonNull(HotelGql)),
      resolve: async (source, {}, { services, verifiedUser }) => {
        return await services.hotelService.getHotels();
      },
    },
  },
});

module.exports = { QueryType };
