const { Router } = require('express');

const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Manager
const manager = new ProductsDbManager();
const router = Router();


// Ruta para la página de inicio
router.get('/', async (req, res) => {
  try {
    const result = await manager.getProducts(req, res);
    console.log('result', result);
    //const products = result.payload;
    // Renderiza la vista home.handlebars y pasa los datos de los productos
    res.render('home', result);
  } catch (error) {
    console.log('Error', error.message)
  }
});

// Ruta para el chat
router.get('/chat', (req, res) => {
  res.render('chat', {});
})

module.exports = router;
