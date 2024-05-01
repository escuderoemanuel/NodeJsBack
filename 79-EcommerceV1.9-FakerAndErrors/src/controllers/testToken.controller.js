const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config/environment.config');

class TestTokenController {
  static getTestToken(req, res) {
    // if (process.env.NODE_ENV !== 'development') {
    //   return res.status(403).json({ error: 'Forbidden' });
    // }

    try {
      const testUser = { id: 'test_id', email: 'test@example.com' };
      const testToken = jwt.sign(testUser, JWT_PRIVATE_KEY, { expiresIn: '7d' }); // Token válido por 7 días en este ejemplo
      res.json({ token: testToken });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = {
  getTestToken: TestTokenController.getTestToken
};
