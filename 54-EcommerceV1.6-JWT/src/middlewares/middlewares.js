const { verifyToken } = require('../utils');

// Middlewares
const publicAuthentication = (req, res, next) => {
  /* if (req.session.user) {
    return res.redirect('/');
  } */
  next();
}

const privateAuthentication = (req, res, next) => {
  /*  if (!req.session.user) {
     return res.redirect('/login');
   } */
  verifyToken
  next();
}

module.exports = {
  publicAuthentication,
  privateAuthentication
}
