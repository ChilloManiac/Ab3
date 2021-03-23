const { GraphQLObjectType, GraphQLNonNull } = require("graphql");
const { RoomGql, RoomInputType } = require("./types/room-gql");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createRoom: {
      type: new GraphQLNonNull(RoomGql),
      args: {
        input: { type: new GraphQLNonNull(RoomInputType) },
      },
      resolve: async (source, { input }, { services, user }) => {
        const { hotelName, roomNumber, ...roomProps } = input;
        return await services.hotelService.addRoom(
          hotelName,
          roomNumber,
          roomProps,
          user
        );
      },
    },
    updateRoom: {
      type: new GraphQLNonNull(RoomGql),
      args: {
        input: { type: new GraphQLNonNull(RoomInputType) },
      },
      resolve: async (source, { input }, { services, user }) => {
        const { hotelName, roomNumber, ...roomProps } = input;
        return services.hotelService.updateRoom(
          hotelName,
          roomNumber,
          roomProps,
          user
        );
      },
    },
  }),
});

module.exports = { MutationType };
