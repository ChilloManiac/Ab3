const { GraphQLSchema } = require("graphql");
const { QueryType } = require("./queries");

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = schema;
