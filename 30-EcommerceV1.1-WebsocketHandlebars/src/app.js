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
const realtimeproductsRouter = require('./routes/realtimeproducts.router');


// Public Folder
app.use(express.static(`${__dirname}/public`))
// Json & Body Params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/realtimeproducts', realtimeproductsRouter)
app.use('/', realtimeproductsRouter)

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Server
const server = app.listen(port, () => {
  console.log(serverMessage)
})

// Socket Setting

const io = new Server(server);

io.on('connection', (socket) => {

  console.log(('Client connected...'))


  // Aqui debería ir el envío de los productos?


  socket.on('disconnect', () => {
    console.log('Client disconnected...')
  })

})




