// Atlas DB Connection
require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const mongoose = require('mongoose');

/* DB Connection */
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/ecommerce`)
  .then(() => {
    console.log('Connected Succesfully')
  })


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
const realTimeProducts = require('./routes/realtimeproducts.router.js');
const homeRouter = require('./routes/home.router.js');
const messagesRouter = require('./routes/messages.router.js');

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
app.use('/api/messages', messagesRouter)
app.use('/api/realtimeproducts', realTimeProducts)
app.use('/', homeRouter)

// Server
const server = app.listen(port, () => {
  console.log(serverMessage)
})

// Socket Setting

const io = new Server(server);

let messages = [];


io.on('connection', (socket) => {

  console.log('User connected...')

  //! Products Events
  // Escucha el evento 'delete-product'
  socket.on('delete-product', (data) => {
    const products = data.products;
    io.emit('update-products', products);
  })

  socket.on('add-product', (data) => {
    console.log('payload: ', data.products)
    const products = data.products;
    io.emit('update-products', products)
  })


  //! Carts Events


  //! Messages Events
  // Recive Event: message received from the client
  socket.on('userMessage', (messageData) => {
    // Save message received in the array of messages
    messages.push(messageData);
    // Send Event: for all clients-sockets!
    io.emit('messages', { messages });
  })

  // Recive Event: user authenticated
  socket.on('authenticated', ({ username }) => {
    // Send Event with the messages in the array: for this client-socket!
    socket.emit('messages', { messages });
    // Send Event: for all users except the one connecting!
    socket.broadcast.emit('newUserConnected', { newUsername: username });
  })


  //! Connection Finished
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected...`)
  })

})


