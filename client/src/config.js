const CLIENT_ID = process.env.OKTA_CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || `https://${process.env.OKTA_DOMAIN}/oauth2/default`;
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/api/',
  },
};