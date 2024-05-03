const { Router } = require('express');
const { verifyToken } = require('../middlewares/verifyToken.middleware');

const router = Router();

router.get('/', verifyToken, (req, res) => {
  // localhost:8080/api/loggerTest
  // req.logger.fatal('0. This is a fatal log');
  req.logger.error('Level 1. Unhandled error');
  req.logger.warn('Level 2. This is a warning log');
  req.logger.info('Level 3. This is a info log');
  req.logger.http('Level 4. This is a http log');
  req.logger.debug('Level 5. This is a debug log');


  res.send({ status: 'success', message: 'Logger test' })
})


module.exports = { loggerTestRouter: router };