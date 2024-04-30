const TypesOfErrors = require('../utils/errors/TypesOfErrors')

const errorHandler = (error, req, res, next) => {
  console.log(error)

  switch (error.code) {
    case TypesOfErrors.UNKNOWN:
      res.status(400).send({ status: 'error', error: error.name, message: error.message })
      break
    default:
      res.status(500).send({ status: 'error', error: 'errorHandler Unknown error' })
  }
}

module.exports = errorHandler