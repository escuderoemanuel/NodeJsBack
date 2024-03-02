const { Router } = require('express');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Manager
const manager = new ProductsDbManager();

const router = Router();

// Deberá traer todos los productos de la base de datos, incluyendo opcionalmente limit, page, sort, filter (Example: http://localhost:8080/api/products?limit=2&page=1&sort=desc&filter=iphone)

router.get('/', async (req, res) => {
  try {
    let paginateData = await manager.getProducts(req, res);
    //console.log('result', paginateData)
    //const products = paginateData.payload;
    //console.log('products', products);
    //res.render('products', products);
    res.render('products', paginateData);
    // res.send(products);
  } catch (error) {
    console.log(error.message)
    //res.status(400).send({ error: error.message });
  }
})

// Deberá traer sólo el producto con el id proporcionado
router.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await manager.getProductById(pid);
    res.send({ status: 'success', payload: product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

// Deberá agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    await manager.addProduct(req.body);

    const products = await manager.getProducts(req, res);
    res.send({ status: 'success', products });

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// Deberá actualizar un producto existente con el id proporcionado.
router.put('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    console.log('PUT ID', id)
    const updatedFields = req.body;

    const updatedProduct = await manager.updateProduct(id, updatedFields);

    res.send({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

// Deberá eliminar un producto existente con el id proporcionado.
router.delete('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const productToDelete = await manager.getProductById(id);
    await manager.deleteProduct(id);
    const products = await manager.getProducts(req, res);
    res.send({ status: 'success', payload: { productToDelete, products } });
  } catch (error) {
    res.status(400).send({ status: 'error', message: error.message });
  }
})

module.exports = router;