const { ApolloServer, gql } = require('apollo-server');
const CredentialsAPI = require('./credentials-api')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Credential {
    id: String
    access_token: String
    refresh_token: String
  }

  type Query {
    credentials: [Credential]
  }

  type Mutation {
    connect(authCode: String): Credential
  }
`;

const resolvers = {
  Query: {
    credentials: (_, __, { dataSources }) => dataSources.credentialsAPI.getCredentials()
  },
  Mutation: {
    connect: async (_, { authCode }, { dataSources }) => {
      const response = await dataSources.credentialsAPI.connect({ authCode });
      if (response) {
        return response;
      }
    },
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        credentialsAPI: new CredentialsAPI()
      };
    },
  }
);

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});