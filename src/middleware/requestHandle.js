const { validationResult } = require('express-validator');
const RequestValidationError = require('../util/requestValidationError');

function requestHandle(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }
  next();
}
module.exports = requestHandle;
