const Subscription = {
    movie: {
        subscribe(parent, { movieId }, { db, pubsub }, info){
            const movie = db.movies.find((movie) => movie.id === movieId)

            if (!movie){
                throw new Error('Movie not found')
            }

            return pubsub.asyncIterator(`movie ${movieId}`)
        }
    }
}

export { Subscription as default }