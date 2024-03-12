export default {
  test: {
    PORT: 3000,
    GRAPHQL_ENDPOINT: 'https://countries.trevorblades.com/',
  },
  development: {
    PORT: 3344,
    GRAPHQL_ENDPOINT: 'https://countries.trevorblades.com/',
    ENDPOINT: 'https://people-api-gateway.dev.us.net/graphql',
    WM_CONSUMER_ID: '',
    WM_SVC_NAME: 'PEOPLE-API-GATEWAY',
    WM_SVC_ENV: 'stg:1.0.0',
    WM_SEC_KEY_VERSION: 1,
    WM_CONSUMER_INTIMESTAMP: '',
    REQUEST_SOURCE: 'API_PROXY',
  },
};
