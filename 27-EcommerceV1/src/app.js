// Routes
const cartsRouter = require('./routes/carts.router.js');
const productsRouter = require('./routes/products.router.js');
// Express
const express = require('express');
const port = 8080;
const serverMessage = `Server is running on port ${port}`;
const app = express();


// Public Folder
app.use(express.static(`${__dirname}/public`))
// Json & Body Params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)


// Server
app.listen(port, () => {
  console.log(serverMessage)
})

