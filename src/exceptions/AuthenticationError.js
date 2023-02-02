const CleintError = require('./ClientError');

class AuthenticationError extends CleintError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
