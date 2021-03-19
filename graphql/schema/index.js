const { GraphQLSchema } = require("graphql");
const { MutationType } = require("./mutations");
const { QueryType } = require("./queries");

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

module.exports = {schema};
