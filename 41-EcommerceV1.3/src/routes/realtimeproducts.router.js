const express = require('express');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Manager
const manager = new ProductsDbManager();

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let realTimeProducts = await manager.getRealTimeProducts();
    console.log('getRealTimeProducts en router', realTimeProducts)
    res.render('realtimeproducts',  { products: realTimeProducts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

module.exports = router;