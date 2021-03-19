const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");
const { RoomGql } = require("./types/room-gql");

const filterType = new GraphQLInputObjectType({
  name: "filter",
  fields: {
    numberOfBeds: {
      type: GraphQLInt,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    rooms: {
      type: new GraphQLList(new GraphQLNonNull(RoomGql)),
      args: { filter: { type: filterType } },
      resolve: async (source, { filter }, { services }) => {
        const rooms = await services.roomService.getAllVacantRooms();
        if (!!filter.numberOfBeds) {
          return rooms.filter(
            (room) => room.numberOfBeds === filter.numberOfBeds
          );
        }
        return rooms;
      },
    },
  },
});

module.exports = { QueryType };
