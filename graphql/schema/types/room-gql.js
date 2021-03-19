const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const RoomGql = new GraphQLObjectType({
  name: "Room",
  fields: {
    roomNumber: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    numberOfBeds: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    isOccupied: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
});

module.exports = { RoomGql };
