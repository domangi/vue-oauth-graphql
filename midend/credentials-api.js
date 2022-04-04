const { RESTDataSource } = require('apollo-datasource-rest');

class CredentialsAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'http://localhost:3000/';
  }

  async getCredentials() {
    return this.get(`oauth_credentials`);
  }

  async connect({ authCode }) {
    return this.post('oauth/connect', {
      auth_code: authCode
    })
  }
}

module.exports = CredentialsAPI