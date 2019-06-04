const Movie = {
    
    actors(parent, args, { db }, info) {    
        return db.actors.filter((actor) => {
            return actor.movie === parent.id
        })
    }

}

export { Movie as default }