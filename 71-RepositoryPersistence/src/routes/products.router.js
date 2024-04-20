const { Router } = require('express');
const { productsService } = require('../repositories');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await productsService.getAll();
    res.send({ status: 'success', payload: result })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message });
  }
});

module.exports = {
  productsRouter: router
};