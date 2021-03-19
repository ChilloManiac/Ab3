// import { GraphQLObjectType, GraphQLString } from "graphql";
const { GraphQLObjectType, GraphQLString } = require('graphql');

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    rooms: {
        type: new GraphQLList(new GraphQLNonNull(Room)),
    },
  },
});


module.exports = {QueryType};