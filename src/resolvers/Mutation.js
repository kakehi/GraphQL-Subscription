import uuidv4 from 'uuid/v4'

const Mutation = {
    
    createMovie(parent, args, { db }, info) {
        
        // Check if the movie title already exists. If so, throw an error due to duplication.
        const movieTitleTaken = db.movies.some((movie) => {
           return movie.title.toLowerCase() === args.data.title.toLowerCase()
        })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        // Creating a new movie constant which comprises of arguments passed from the mutation operator.
        const movie = {
            id: uuidv4(),
            ...args.data
        }

        db.movies.push(movie)

        return movie
    },

    deleteMovie(parent, args, { db }, info){

        // First, check if the movie ID exists. If it doesn't throw an error.
        const movieIndex = db.movies.findIndex((movie) => movie.id === args.id)

        if(movieIndex === -1){
            throw new Error('Movie does not found')
        }

        // Update the movie array.
        const deletedMovies = db.movies.splice(movieIndex, 1)

        db.actors.forEach((actor) => {
            actor.movie.forEach((movie) => {
                if(movie === args.id){
                    movie = null
                }
            })
        })

        return deletedMovies[0]
    },

    createActor(parent, args, { db }, info) {
        
        // Check if the actor name and agent name have existed together for another instance. If so, throw an error due to duplication.
        const actorNameTaken = db.actors.some((actor) => {
           return actor.name.toLowerCase() === args.data.name.toLowerCase() && actor.agent.toLowerCase() === args.data.agent.toLowerCase()
        })

        if(actorNameTaken){
            throw new Error('This actor name exists.')
        }
        
        // Creating a new actor constant which comprises of arguments passed from the mutation operator.
        const actor = {
            id: uuidv4(),
            ...args.data
        }

        db.actors.push(actor)

        return actor
    },

    deleteActor(parent, args, { db }, info){

        // First, check if the actor ID exists. If it doesn't throw an error.
        const actorIndex = db.actors.findIndex((actor) => actor.id === args.id)

        if(actorIndex === -1){
            throw new Error('Actor does not found')
        }

        // Update the movie array.
        const deletedActors = db.actors.splice(actorIndex, 1)

        return deletedActors[0]
    },
}

export { Mutation as default }