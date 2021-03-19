const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean
} = require("graphql");
const { RoomGql } = require("./types/room-gql");

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
      resolve: async (source, { filter }, { services, verifiedUser}) => {
        console.log(verifiedUser)
        const rooms = filter?.vacant ? await services.roomService.getAllVacantRooms() : await services.roomService.getAllRooms();
        if (!!filter?.numberOfBeds) {
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
