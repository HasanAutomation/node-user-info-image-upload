const AppError = require('./AppError');

class RequestValidationError extends AppError {
  constructor(errors, statusCode = 400) {
    super('Request Validation Failed');
    Error.captureStackTrace(this, this.constructor);
    this.message = (errors || []).map(error => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
module.exports = RequestValidationError;
