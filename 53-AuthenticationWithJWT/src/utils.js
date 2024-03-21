// BCRYPT
const bcrypt = require('bcrypt');

const createHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPassword;
}

const isValidPassword = (user, password) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
}

module.exports = {
  createHash,
  isValidPassword
}

// JWT
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
  return token;
}

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: 'error', error: 'Access denied. Not authenticated.' });
  }
  try {
    // Esto porque el authHeader llega como 'bearer aksdh9a9ascsac'
    const token = authHeader.split(' ')[1];
    const verified = jwt.verify(token, SECRET_KEY, (error, credentials) => {
      if (error) {
        return res.status(403).json({ status: 'error', error: 'Access denied. Invalid token.' });
      }
      req.user = credentials.user;
      return next();
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }

}

// EXPORTS
module.exports = {
  createHash,
  isValidPassword,
  generateToken,
  authToken
};