// Demo user data
let movies = [{
    id: '1',
    title: 'The Godfather Part 2',
    released: true
},
{
    id: '2',
    title: 'Pulp Fiction',
    released: true
}
]

let actors = [{
    id: '101',
    name: 'Marlon Brando',
    agent: 'William Morris Endeavor',
    movie: '1'
},{
    id: '102',
    name: 'Robert De Nilo',
    agent: 'United Talent Agency',
    movie: '1'
},{
    id: '103',
    name: 'Al Pacino',
    agent: 'United Talent Agency',
    movie: '1'
},
{
    id: '104',
    name: 'John Travolta',
    agent: 'The Gersh Agency',
    movie: '2'
},
{
    id: '105',
    name: 'Samuel L. Jackson',
    agent: 'Agency for the Performing Arts',
    movie: '2'
}]

const db = {
    movies,
    actors
}

export { db as default }