const Subscription = {
    movie: {
        subscribe(parent, args, { db, pubsub }, info){
            return pubsub.asyncIterator("movie")
        }
    }
}

export { Subscription as default }