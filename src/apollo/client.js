import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import storageEncrypt from '../helpers/storageEncrypt'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URI + '/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: storageEncrypt.decrypt('token')
        ? storageEncrypt.decrypt('token')
        : ''
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
