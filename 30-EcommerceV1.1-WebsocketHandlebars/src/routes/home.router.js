const { Router } = require('express');

const router = Router();


// Ruta para la página de inicio
router.get('/', (req, res) => {
  // Lee el archivo products.json
  const products = require('../files/products.json');
  // Renderiza la vista home.handlebars y pasa los datos de los productos
  res.render('home', { products });
});

module.exports = router;