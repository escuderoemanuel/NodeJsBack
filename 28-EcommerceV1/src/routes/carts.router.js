const { Router } = require('express');
const CartsManager = require('../CartManager');

// Manager
manager = new CartsManager(`${__dirname}/carts.json`);

const router = Router();


// Deberá listar todos los carritos.
router.get('/', (req, res) => {
  try {
    res.json({ carts: carts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})


// Deberá listar los productos que pertenezcan al carrito con el parámetro *'cid'* proporcionados.
router.get('/:cid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const cart = await manager.getCartById(cid);
    res.send({ status: 'success', cart: cart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})









module.exports = router;