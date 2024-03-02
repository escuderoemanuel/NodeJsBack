const { Router } = require('express');

const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Manager
const manager = new ProductsDbManager();
const router = Router();


// Ruta para la página de inicio
router.get('/', async (req, res) => {
  const products = await manager.getProducts(req);
  // Renderiza la vista home.handlebars y pasa los datos de los productos
  res.render('home', products);
});

// Ruta para el chat
router.get('/chat', (req, res) => {
  res.render('chat', {});
})

module.exports = router;
