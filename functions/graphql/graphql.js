const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNA })

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    body: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(body: String!): Todo
    updateTodoCompleted(id: ID!, completed: Boolean!): Todo
  }
`
// const todos = {}
// let todoIndex = 0

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello Launch School!",
    todos: async (parent, args, { user }) => {
      console.log("user", user)
      if (!user) {
        console.log("No user")
        return []
      } else {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("todos_by_user"), user))
        )
        console.log(results)
        return results.data.map(([ref, body, completed]) => ({
          id: ref.id,
          body,
          completed,
        }))
      }
    },
  },
  Mutation: {
    addTodo: async (_, { body }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to insert todos.")
      }
      const results = await client.query(
        q.Create(q.Collection("todos"), {
          data: {
            body,
            completed: false,
            owner: user,
          },
        })
      )
      return {
        ...results.data,
        id: results.ref.id,
      }
    },
    updateTodoCompleted: async (_, { id, completed }, { user }) => {
      if (!user) {
        throw new Error("Must be authenticated to update todos.")
      }
      const results = await client.query(
        q.Update(q.Ref(q.Collection("todos"), id), {
          data: {
            completed: !completed,
          },
        })
      )
      return {
        ...results.data,
        id: results.ref.id,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub }
    } else {
      return {}
    }
  },

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
})

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
})
