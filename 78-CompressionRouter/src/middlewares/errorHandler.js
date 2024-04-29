const ErrorTypes = require('../utils/errorsHandler/ErrorTypes')

const errorHandler = (error, req, res, next) => {
  console.log(error.cause)

  switch (error.code) {
    case ErrorTypes.INVALID_TYPE_ERROR:
      res.status(400).send({ status: 'error', error: error.name })
      break;

    default:
      res.status(500).send({ status: 'error', error: 'Unhandled error' })
  }
}

module.exports = errorHandler