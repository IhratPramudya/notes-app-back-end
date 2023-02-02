const CleintError = require('./ClientError');

class AuthorizationError extends CleintError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
