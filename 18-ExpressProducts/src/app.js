const express = require('express');
const ProductManager = require('./ProductManager');
const port = 8080;
const server = express();
const serverMessage = `This is a server with Express.js running on port ${port}...`

manager = new ProductManager('./src/products.json');

server.use(express.json())
// To use query params
server.use(express.urlencoded({ extended: true }))


// ctrl + click => http://localhost:8080
server.get('/', (req, res) => {
  res.send(serverMessage)
})

// Enpoint '/products'
// ctrl + click => http://localhost:8080/products
// Support query: ?limit=3
// ctrl + click => http://localhost:8080/products?limit=5
server.get('/products', async (req, res) => {
  let products = await manager.getProducts();

  // limit is a string in the url, so we need to convert it to a number to avoid errors
  const limit = parseInt(req.query.limit);

  if (limit) {
    products = products.slice(0, limit);
  }

  res.send(products);
});

// Enpoint /products/:pid
// ctrl + click => http://localhost:8080/products/2
// ctrl + click => http://localhost:8080/products/34123123
server.get('/products/:pid', async (req, res) => {

  // pid is a string in the url, so we need to convert it to a number to avoid errors
  const id = parseInt(req.params.pid);
  const product = await manager.getProductById(id);
  if (!product) {
    res.status(404).send({ 'error': 'The product does not exists' });
  } else {
    res.send(product);
  }
})


server.listen(port, () => {
  console.log(serverMessage)
})