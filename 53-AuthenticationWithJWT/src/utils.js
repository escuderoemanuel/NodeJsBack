const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'MySecret';

const generateToken = (user) => {
  //delete user.password;
  const accessToken = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
  return accessToken;
}

// middleware
const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ status: 'error', error: 'Access Denied' });
  }

  // Llega authorization 'bearer alskndalsd98d'
  const accessToken = authHeader.split(' ')[1];
  console.log('accessToken en el VERIFY:', accessToken)
  try {
    jwt.verify(accessToken, PRIVATE_KEY, (err, credentials) => {
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