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
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (source)=>{context.roomNumber}

        },
        numberOfBeds: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (context)=>{context.roomNumber}

        },
        isOccupied: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: (context)=>{context.isOccupied}

        }
    }
});

export default RoomGql;