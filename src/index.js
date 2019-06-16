import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Movie from './resolvers/Movie'
import Actor from './resolvers/Actor'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Movie,
        Actor
    },
    context: {
        db, 
        pubsub
    }
})

server.start(()=>{
    console.log('The server is up and running on 4000')
})