import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
  } from 'graphql';

import RoomGql from './room-gql'

// TODO: Change someApi
const HotelGql = new GraphQLObjectType({
    name: 'Hotel',
    fields:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        streetName: {type: new GraphQLNonNull(GraphQLString)},
        houseNumber: {type: new GraphQLNonNull(GraphQLInt)},
        zip: {type: new GraphQLNonNull(GraphQLInt)},
        owner: {type: new GraphQLNonNull(GraphQLString)},
        rooms: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoomGql))),
            resolve: (source, args, { someApi }) => 
                someApi.roomList(source.name),
        },
    }
})

export default HotelGql;