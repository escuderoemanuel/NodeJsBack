const { Router } = require('express');

const router = Router();
const ProductManager = require('../ProductManager');

// Manager
const manager = new ProductManager(`${__dirname}/../files/products.json`);

// Ruta para la página de inicio
router.get('/', (req, res) => {
  // Lee el archivo products.json
  const products = require('../files/products.json');
  // Renderiza la vista home.handlebars y pasa los datos de los productos
  res.render('home', { products });
});

// Ruta para la página de productos en tiempo real, trabajará con websocket.
//Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista
router.get('/realtimeproducts', async (req, res) => {
  try {
    let products = await manager.getProducts();
    // Límite string parseado a number
    const limit = parseInt(req.query.limit);
    if (limit) {
      products = products.slice(0, limit);
    }
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;