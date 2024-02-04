const express = require('express');
const ProductManager = require('../ProductManager');

// Manager
const manager = new ProductManager(`${__dirname}/../files/products.json`);

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts(req.query.limit)
    res.render('realTimeProducts', {
      products,
      layout: 'main'
    })
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;

