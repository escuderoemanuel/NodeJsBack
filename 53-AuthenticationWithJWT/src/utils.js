const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'MySecret';

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1d' });
  return token;
}

// middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access Denied');
  }

  // Llega authorization 'bearer alskndalsd98d'
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
      if (err) {
        return res.status(403).send({ status: 'error', error: 'Forbidden' });
      }
      req.user = credentials.user;
      next();
    })
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};