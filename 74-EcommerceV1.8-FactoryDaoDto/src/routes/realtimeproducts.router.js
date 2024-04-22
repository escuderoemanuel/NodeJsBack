const express = require('express');
const { privateAccess } = require('../middlewares/middlewares');
// const RealTimeProductsController = require('../controllers/realTimeProducts.controller');
const ProductsController = require('../controllers/products.controller');
const router = express.Router();

//router.get('/', privateAccess, ProductsController.getAll)
router.get('/', ProductsController.getAll)

module.exports = router;