const { verifyToken } = require('./verifyToken.middleware');

// Middlewares
const publicAccess = (req, res, next) => {
  next();
}

const privateAccess = (req, res, next) => {
  verifyToken
  next();
}

module.exports = {
  publicAccess,
  privateAccess
}