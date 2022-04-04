
import { createApp } from 'vue'
import App from './App.vue'
import GAuth from 'vue3-google-oauth2'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'


const app = createApp(App)

// Google OAuth
const gAuthOptions = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scopes: 'https://www.googleapis.com/auth/calendar.readonly',
  access_type: 'offline',
  include_granted_scopes: 'true',
  fetch_basic_profile: false,
  prompt: 'consent'
}
app.use(GAuth, gAuthOptions)

// Apollo Graphql
const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
app.use(apolloProvider)

app.mount('#app')
