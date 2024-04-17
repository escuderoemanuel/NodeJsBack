const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('./config/environment.config');

// HASH PASSWORD
const createHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPassword;
}

const isValidPassword = (user, password) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
}

// JWT
const generateToken = (serializableUser) => {
  const accessToken = jwt.sign({ serializableUser }, JWT_PRIVATE_KEY, { expiresIn: '1d' });
  console.log('accessToken en generateToken', accessToken) //! GENERA BIEN
  return accessToken;

}

// JWT Middleware
const verifyToken = (req, res, next) => {
  console.log('res', req.cookies.accessToken)
  const accessToken = req.cookies.accessToken; //! NO RECUPERA
  console.log('accessToken en Utils verifyToken', accessToken)

  if (accessToken) {

    jwt.verify(accessToken, JWT_PRIVATE_KEY, (error, credentials) => {
      if (error) {
        return res.status(403).send({ status: 'error', error: 'Utils JWT Verify Forbidden', message: error.message });
      }
      req.tokenUser = credentials;
    });
  }
  next();

}

module.exports = {
  createHash,
  isValidPassword,
  generateToken,
  verifyToken
};