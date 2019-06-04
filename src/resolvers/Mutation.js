import uuidv4 from 'uuid/v4'

const Mutation = {
    
    createMovie(parent, args, { db }, info) {
        
        const movieTitleTaken = db.movies.some((movie) => {
           return movie.title.toLowerCase() === args.data.title.toLowerCase()
        })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        const movie = {
            id: uuidv4(),
            ...args.data
        }

        db.movies.push(movie)

        return movie
    },

    createActor(parent, args, { db }, info) {
        
        const actorNameTaken = db.actors.some((actor) => {
           return actor.name.toLowerCase() === args.data.name.toLowerCase() && actor.agent.toLowerCase() === args.data.agent.toLowerCase()
        })

        if(actorNameTaken){
            throw new Error('This actor name exists.')
        }

        console.log(args.data)
        
        const actor = {
            id: uuidv4(),
            ...args.data
        }

        db.actors.push(actor)

        return actor
    }
}

export { Mutation as default }