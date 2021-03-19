const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    rooms: {
        type: new GraphQLList(new GraphQLNonNull(Room)),
        resolve: (source, args, {roomService}) => roomService.GetAllVacantRooms()
    },
  },
});


module.exports = {QueryType};