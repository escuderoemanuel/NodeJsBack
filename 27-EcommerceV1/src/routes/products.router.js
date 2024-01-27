const { Router } = require('express');
const ProductManager = require('../ProductManager');
//const { upload } = require('../middlewares/multer');


// Manager
manager = new ProductManager(`${__dirname}/products.json`);

const router = Router();


// Deberá traer todos los productos de la base de datos, incluyendo la limitación ?limit
router.get('/', async (req, res) => {
  let products = await manager.getProducts();
  // Límite string parseado a number
  const limit = parseInt(req.query.limit);
  if (limit) {
    products = products.slice(0, limit);
  }
  res.send({ products: products });
})

router.get('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await manager.getProductById(pid);
  res.send({ product: product });
})

router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnails, code, stock, status, category } = req.body;

    const newProduct = await manager.addProduct(title, description, price, thumbnails, code, stock, status, category);

    res.send({ status: 'success', product: newProduct });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


/* router.post('/', (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  product.image = req.file.filename;
  product.timestamp = new Date().toLocaleString();
  product.stock = Math.floor(Math.random() * (100 - 1) + 1);
  product.code = Math.floor(Math.random() * (999999 - 100000) + 100000);
  product.status = true;
  product.category = product.category.toLowerCase();
  product.description = product.description.toLowerCase();
  product.title = product.title.toLowerCase();

  products.push(product);
  res.send({
    status: 'success',
    message: 'Product added successfully',
    products: products,
  });
}) */

module.exports = router;