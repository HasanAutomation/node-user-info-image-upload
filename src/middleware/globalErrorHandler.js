function globalErrorHandler(err, req, res, next) {
  console.log('ERR', err);
  if (Array.isArray(err.message)) {
    res.status(err.statusCode || 400).json({
      errors: err.message.map(er => ({ error: `${er.field} is invalid` })),
      data: [],
      status: req.status || 'fail',
    });
  } else {
    res.status(err.statusCode || 400).json({
      errors: [{ error: err.message }],
      data: [],
      status: req.status || 'fail',
    });
  }
}

module.exports = globalErrorHandler;
