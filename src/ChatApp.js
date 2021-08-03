import RouterApp from './router/RouterApp'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'

export default function ChatApp () {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterApp />
      </Provider>
    </ApolloProvider>
  )
}
