// Solamente traemos Server de io
const { Server } = require('socket.io');

// Handlebars
const handlebars = require('express-handlebars');

// Express
const express = require('express');
const port = 8080;
const serverMessage = `Server is running on port ${port}`;
const app = express();

// Import Routes
const cartsRouter = require('./routes/carts.router.js');
const productsRouter = require('./routes/products.router.js');
const realtimeproductsRouter = require('./routes/realtimeproducts.router.js');
const homeRouter = require('./routes/home.router.js');

// Public Folder
app.use(express.static(`${__dirname}/public`))
// Json & Body Params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Routes
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/realtimeproducts', realtimeproductsRouter)
app.use('/api/home', homeRouter)

// Server
const server = app.listen(port, () => {
  console.log(serverMessage)
})

// Socket Setting

const io = new Server(server);

io.on('connection', (socket) => {

  console.log(('Client connected...'))

  // Escucha el evento 'delete-product'
  socket.on('delete-product', async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'delete',
      });
      const { products } = await response.json();
      // Emitir evento 'delete-product' con los productos actualizados
      io.emit('delete-product', products);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected...')
  })

})




