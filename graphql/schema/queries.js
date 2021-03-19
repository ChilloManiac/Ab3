// import { GraphQLObjectType, GraphQLString } from "graphql";
const { GraphQLObjectType, GraphQLString } = require('graphql');

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    taskInfo: {
      type: GraphQLString,
      resolve: async () => {
        return "dav";
      },
    },
  },
});


module.exports = {QueryType};