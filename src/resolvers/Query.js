const Query = {
    movies(parent, args, { db }, info) {
        
        // If the search query does not exist, just return the list
        if(!args.query) {
            return db.movies
        }

        // It should filter out items that don't align with the query definitions
        return db.movies.find((movie) => {
            return movie.title.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    actors(parent, args, { db }, info) {
        return db.actors
    }
}

export { Query as default }