import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Movie from './resolvers/Movie'
import Actor from './resolvers/Actor'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Movie,
        Actor
    },
    context: {
        db: db
    }
})

server.start(()=>{
    console.log('The server is up and running on 4000')
})