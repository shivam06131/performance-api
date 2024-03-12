export default {
  test: {
    PORT: 3000,
    GRAPHQL_ENDPOINT: 'https://countries.trevorblades.com/',
  },
  development: {
    PORT: 3344,
    GRAPHQL_ENDPOINT: 'https://countries.trevorblades.com/',
    ENDPOINT: 'https://people-api-gateway.dev.us.net/graphql',
  },
}
