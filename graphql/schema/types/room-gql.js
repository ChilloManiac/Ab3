import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';

const RoomGql = new GraphQLObjectType({
    name: 'Room',
    fields: {
        roomNumber: {
            type: new GraphQLNonNull(GraphQLInt)

        },
        numberOfBeds: {
            type: new GraphQLNonNull(GraphQLInt)

        },
        isOccupied: {
            type: new GraphQLNonNull(GraphQLBoolean)

        }
    }
});

export default RoomGql;