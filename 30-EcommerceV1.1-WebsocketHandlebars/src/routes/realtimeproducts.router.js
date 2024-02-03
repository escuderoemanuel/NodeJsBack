const { Router } = require('express');

const router = Router();
const ProductManager = require('../ProductManager');

// Manager
const manager = new ProductManager(`${__dirname}/../files/products.json`);


// Ruta para la página de productos en tiempo real, trabajará con websocket.
//Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista
router.get('/', async (req, res) => {
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


// Deberá agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnails, req.body.code, req.body.stock, req.body.status, req.body.category);
    products.push(newProduct);

    // Emitir evento 'newProduct' con el nuevo producto creado. El cliente escuchará este evento y actualizará su vista de productos en tiempo real.
    //io.emit('newProduct', newProduct);
    req.app.get('io').emit('newProductAdded', newProduct);

    res.send({ status: 'success', message: 'Product added successfully', payload: newProduct });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;