const ErrorTypes = require('./ErrorTypes');

class CustomError extends Error {
  constructor({ name = 'error', cause, message, code = ErrorTypes.UNKNOWN }) {
    super(message);
    this.name = name;
    this.cause = cause;
    this.code = code;
  }
}

module.exports =
  CustomError
