const express = require('express');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Manager
const manager = new ProductsDbManager();

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let paginateData = await manager.getProducts(req, res);
    console.log('products EN EL GET DEL REALTIMEPRODUCTS.ROUTER', paginateData)
    res.render('realtimeproducts',
      paginateData
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

module.exports = router;