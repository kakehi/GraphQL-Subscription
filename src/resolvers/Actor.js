const Actor = {
    
    movie(parent, args, ctx, info) {
        return movies.filter((movie) => {
            return movie.id === parent.movie
        })
    }

}

export { Actor as default }