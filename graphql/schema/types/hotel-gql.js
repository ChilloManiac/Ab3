const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = require("graphql");

const { RoomGql } = require("./room-gql");

const HotelGql = new GraphQLObjectType({
  name: "Hotel",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    streetName: { type: new GraphQLNonNull(GraphQLString) },
    houseNumber: { type: new GraphQLNonNull(GraphQLInt) },
    zip: { type: new GraphQLNonNull(GraphQLInt) },
    owner: { type: new GraphQLNonNull(GraphQLString) },
    rooms: { type: new GraphQLNonNull (new GraphQLList (new GraphQLNonNull(RoomGql))) },
  },
});

module.exports = { HotelGql };
