
const { Router } = require('express');
//const { upload } = require('../middlewares/multer');


const router = Router();

const products = [];

router.get('/', (req, res) => {
  res.send({ products: products });
})

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