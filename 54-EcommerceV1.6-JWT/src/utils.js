const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY;

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
const generateToken = (user) => {
  const accessToken = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1d' });
  console.log('accessToken en generateToken', accessToken)
  return accessToken;
}

// JWT Middleware
const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ status: 'error', error: 'Access Denied' });
  }

  // Llega authorization 'bearer alskndalsd98d'
  const accessToken = authHeader.split(' ')[1];
  console.log('accessToken en el VERIFY:', accessToken)
  try {
    const decoded = jwt.verify(accessToken, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        return res.status(403).send({ status: 'error', error: 'Forbidden' });
      }
      req.user = credentials.user;
      next();
    });
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = {
  createHash,
  isValidPassword,
  generateToken,
  verifyToken
};