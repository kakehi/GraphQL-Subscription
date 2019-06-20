import uuidv4 from 'uuid/v4'

const Mutation = {
    
    createMovie(parent, { data }, { db, pubsub }, info) {
        
        // Check if the movie title already exists. If so, throw an error due to duplication.
        const movieTitleTaken = db.movies.some((movie) => {
           return movie.title.toLowerCase() === data.title.toLowerCase()
        })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        // Creating a new movie constant which comprises of arguments passed from the mutation operator.
        const movie = {
            id: uuidv4(),
            ...data
        }

        db.movies.push(movie)
        
        pubsub.publish("movie", {
            movie: {
                mutation: 'CREATED',
                data: movie
            }
        })
        

        return movie
    },

    updateMovie(parent, { id, data }, { db }, info){

        const movie = db.movies.find((movie) => movie.id === id )
        const originalMovie = { ...movie }

        if(!movie){
            throw new Error('Movie not found')
        }

        const movieTitleTaken = db.movies.some((movie) => {
            return movie.title.toLowerCase() === data.title.toLowerCase()
         })

        if(movieTitleTaken){
            throw new Error('This movie title exists.')
        }

        // Update the movie title, if the new title is not null
        if(typeof data.title === 'string'){
            movie.title = data.title
        }

        // Update the movie release, if the new released is not null
        if(typeof data.released === 'boolean'){
            movie.released = data.released
            
            if(originalMovie.released && !movie.released){
                // The movie was just unreleased
                pubsub.publish("movie", {
                    movie: {
                        mutation: 'CREATED',
                        data: movie
                    }
                })
            } else if (!originalMovie.released && movie.released ){
                // The movie was just released
                pubsub.publish("movie", {
                    movie: {
                        mutation: 'DELETED',
                        data: movie
                    }
                })
            }
        } else if ( movie.released ) {
            // No new boolean was passed, so only information is updated.
            pubsub.publish("movie", {
                movie: {
                    mutation: 'UPDATED',
                    data: movie
                }
            })
        }
        
        return movie
    },

    deleteMovie(parent, { id }, { db, pubsub }, info){

        // First, check if the movie ID exists. If it doesn't throw an error.
        const movieIndex = db.movies.findIndex((movie) => movie.id == id)

        if(movieIndex === -1){
            throw new Error('Movie not found')
        }

        // Update the movie array.
        const [deletedMovie] = db.movies.splice(movieIndex, 1)

        db.actors.forEach((actor) => {
            if(actor.movie === id){
                actor.movie = null
            }
        })

        pubsub.publish("movie", {
            movie: {
                mutation: 'DELETED',
                data: deletedMovie
            }
        })

        return deletedMovie
    },

    createActor(parent, { data }, { db }, info) {
        
        // Check if the actor name and agent name have existed together for another instance. If so, throw an error due to duplication.
        const actorNameTaken = db.actors.some((actor) => {
           return actor.name.toLowerCase() === data.name.toLowerCase() && actor.agent.toLowerCase() === data.agent.toLowerCase()
        })

        if(actorNameTaken){
            throw new Error('This actor name exists.')
        }
        
        // Creating a new actor constant which comprises of arguments passed from the mutation operator.
        const actor = {
            id: uuidv4(),
            ...data
        }

        db.actors.push(actor)

        return actor
    },

    updateActor(parent, { id, data }, { db }, info){

        const actor = db.actors.find((actor) => actor.id === id )

        if(!actor){
            throw new Error('Actor not found')
        }

        // Update the actor name, if the new actor is not null
        if(typeof data.name === 'string'){
            actor.name = data.name
        }

        // Update the actor's agent, if the new agent is not null
        if(typeof data.agent === 'string'){
            actor.agent = data.agent
        } 

        // Update the actor's movie, if the new movie is not null
        if(typeof data.movie === 'string'){
            actor.movie = data.movie
        } 
        
        return actor
    },
    deleteActor(parent, { id }, { db }, info){

        // First, check if the actor ID exists. If it doesn't throw an error.
        const actorIndex = db.actors.findIndex((actor) => actor.id === id)

        if(actorIndex === -1){
            throw new Error('Actor does not found')
        }

        // Update the movie array.
        const deletedActors = db.actors.splice(actorIndex, 1)

        return deletedActors[0]
    },
}

export { Mutation as default }