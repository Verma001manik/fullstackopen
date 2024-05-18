const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const { errorMonitor } = require('events')
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to, ",MONGODB_URI)
const jwt = require('jsonwebtoken')
mongoose.connect(MONGODB_URI)
  .then(()=>{
    console.log("connected to mongodb")

  })
  .catch((error)=>{
    console.log("error connecting to mongodb", error.message)

  })
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]




const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String
    genres: [String!]!

  }
  type Author {
    name : String!
    id :    ID!
    born: Int
    bookCount: Int!
    

  }
  type User{
    username: String!
    favouriteGenre: String!
    id: ID!

  }
  type Token{
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount : Int!
    allBooks(author: String , genre: String):[Book!]
    allAuthors: [Author!]!
    me: User

  }

  type Mutation {
    addBook(
      title: String
      published: Int
      author: String
      genres: [String]
    ):Book

    editAuthor(name: String!, setBornTo: Int):Author

    createUser(
      username: String!
      favouriteGenre: String

    ):User
    login(
      username: String!
      password: String!

    ):Token
  }
  
`

const resolvers = {
  Query: {
    bookCount :async ()=> Book.collection.countDocuments(),
    authorCount: async ()=>Author.collection.countDocuments(),
    allBooks: async (root,args)=>{
      return Book.find({})
    },
    allAuthors: async (root,args) => {
      return Author.find({})
      
    },
    

  },
  Author:{
    name: (root)=>root.name,
    id : (root)=>root.id,
    born: (root)=>root.born,
    bookCount: (root)=>root.bookCount

  },
  Mutation:{
    addBook:async (root,args)=>{

      const book = new Book({...args})

      try{
         book.save()
      }catch(error){
        throw new GraphQLError("saving book failed",{
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      return book
      

    },
      editAuthor: (root, args) => {
        const author = Author.findOne({name: args.name}) // Return null if no matching author is found
        author.born = args.setBornTo
        try{
          author.save()

        }catch(error){
          throw new GraphQLError("saving author failed",{
            extensions: {
              code : 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
  },
  createUser : async (root,args)=>{
    const user = new User({username: args.username})
    return user.save()
      .catch(error=>{
        throw new GraphQLError("creating user failed",{
          extensions:{
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,

            error
          }
        })
      })
  },
  login: async (root,args)=>{
    const user = User.findOne({username: args.username})

    if(!user || args.password !=='secret'){
      throw new GraphQLError("wrong credentials",{
        extensions: {
          code: 'BAD_USER_INPUT',

        }
      })
    }
    const userForToken = {
      username: user.username, 
      id: user._id

    }
    return {value : jwt.sign(userForToken, process.env.JWT_SECRET)}
  }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req,res})=>{
    const auth = req ? req.headers.authorization: null
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7),process.env.JWT_SECRET

      )
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})