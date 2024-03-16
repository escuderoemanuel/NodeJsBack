const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'ThisIsOurSecret'

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign({ user }, PRIVATE_KEY, {
    expiresIn: '1d'
  })
  return token;
}

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401)
    .send({ status: 'error', error: 'Not authenticated' })

  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.sendStatus(403)
      .send({ status: 'error', error: 'Not authorized' })

    req.user = credentials.user
    next()

  })
}

module.exports = { generateToken, authToken }