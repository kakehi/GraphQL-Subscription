const Actor = {
    
    movie(parent, args, { db }, info) {
        return db.movies.filter((movie) => {
            return movie.id === parent.movie
        })
    }

}

export { Actor as default }