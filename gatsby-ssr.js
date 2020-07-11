import React from "react"

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    fetch,
    uri: "https://dummy-heads.netlify.app/.netlify/functions/graphql",
  }),
})

export const wrapRootElement = ({ element }) => {
  console.log("gatsby ssr running")
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
