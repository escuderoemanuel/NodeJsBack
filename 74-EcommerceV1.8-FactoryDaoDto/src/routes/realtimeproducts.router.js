const express = require('express');
const { privateAccess } = require('../middlewares/middlewares');
const RealTimeProductsController = require('../controllers/realTimeProducts.controller');
const router = express.Router();

router.get('/', privateAccess, RealTimeProductsController.getAll)

module.exports = router;