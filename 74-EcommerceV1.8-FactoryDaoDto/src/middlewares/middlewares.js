const { verifyToken } = require('./verifyToken.middleware');

// Middlewares
const publicAuthentication = (req, res, next) => {
  next();
}

const privateAuthentication = (req, res, next) => {
  verifyToken
  next();
}

module.exports = {
  publicAuthentication,
  privateAuthentication
}