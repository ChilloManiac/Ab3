const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLString,
} = require("graphql");

const numberOfBedsType = { type: GraphQLInt}
const isOccupiedType = { type: GraphQLBoolean}
const roomNumberType = { type: GraphQLInt}

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

const AddRoomInputType = new GraphQLInputObjectType({
  name: "AddRoomInput",
  fields: {
    numberOfBeds: numberOfBedsType,
    isOccupied: isOccupiedType,
    roomNumber: roomNumberType,
    hotelName: {
      type: GraphQLString,
    }
  },
});

module.exports = { RoomGql, AddRoomInputType };
