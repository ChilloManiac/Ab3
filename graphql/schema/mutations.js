const { GraphQLObjectType, GraphQLNonNull } = require("graphql");
const { RoomGql, AddRoomInputType } = require("./types/room-gql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createRoom: {
      type: new GraphQLNonNull(RoomGql),
      args: {
        input: { type: new GraphQLNonNull(AddRoomInputType) },
      },
      resolve: async (source, { input }, { services }) => {
        return context.services.hotelService.addRoom(input);
      },
    },
  }),
});

module.exports = { MutationType };
