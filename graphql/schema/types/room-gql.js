const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLString,
} = require("graphql");

const numberOfBedsType = { type: GraphQLInt };
const isOccupiedType = { type: GraphQLBoolean };
const roomNumberType = { type: GraphQLInt };
const seaViewType = { type: GraphQLBoolean };
const miniBarType = { type: GraphQLBoolean };
const numberOfRestroomsType = { type: GraphQLInt };

const RoomGql = new GraphQLObjectType({
  name: "Room",
  fields: {
    numberOfBeds: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    isOccupied: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    roomNumber: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    seaView: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    miniBar: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    numberOfRestrooms: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

const RoomInputType = new GraphQLInputObjectType({
  name: "RoomInput",
  fields: {
    numberOfBeds: numberOfBedsType,
    isOccupied: isOccupiedType,
    roomNumber: roomNumberType,
    seaView: seaViewType,
    miniBar: miniBarType,
    numberOfRestrooms: numberOfRestroomsType,
    hotelName: {
      type: GraphQLString,
    },
  },
});

module.exports = { RoomGql, RoomInputType };
