// Imports Atlas DB Connection
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

// Imports Routes
const cartsRouter = require('./routes/carts.router.js');
const productsRouter = require('./routes/products.router.js');
const realtimeproducts = require('./routes/realtimeproducts.router.js');
const homeRouter = require('./routes/home.router.js');
const chatRouter = require('./routes/chat.router.js');
const MessagesModel = require('./dao/models/messages.model.js');
const sessionRouter = require('./routes/sessions.router.js');
const viewsRouter = require('./routes/views.router.js');
const initializePassport = require('./config/passport.config.js');
const passport = require('passport');

// Import Mongo & Mongoose 
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

// Import Server de socket.io
const { Server } = require('socket.io');

// Imports Handlebars
const handlebars = require('express-handlebars');

// Imports Express
const express = require('express');

// Imports Session
const session = require('express-session');

// Mongoose Init & Connect
mongoose.connect(`${MONGO_URL}`)
  .then(() => {
    console.log('DB Connected Succesfully')
  })

// Express Settings
const PORT = 8080;
const serverMessage = `Server is running on port ${PORT}`;
const app = express();

// Session Settings
app.use(session({
  secret: 'milusaveme',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `${MONGO_URL}`, ttl: 60 * 60 }),
}))


// Init Passport
initializePassport();
// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Public Folder
app.use(express.static(`${__dirname}/public`))

// Middlewares Json & Body Params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Settings
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Routes Settings
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/chat', chatRouter)
app.use('/api/realtimeproducts', realtimeproducts)
//app.use('/home', homeRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

// Server
const server = app.listen(PORT, () => {
  console.log(serverMessage)
})

// Socket Setting
const io = new Server(server);

io.on('connection', async (socket) => {

  console.log('Connected User Socket...')

  //! Products Events
  socket.on('delete-product', (data) => {
    const products = data.products.paginateData.payload;
    io.emit('update-products', products)
  })

  socket.on('add-product', (data) => {
    const products = data.products.paginateData.payload;
    io.emit('update-products', products)
  })

  //! Messages Events
  // Recive Event: user authenticated
  socket.on('authenticated', ({ user }) => {
    // Send Event with the messages in the array: for this client-socket!
    socket.emit('messages', { messages });
    // Send Event: for all users except the one connecting!
    socket.broadcast.emit('newUserConnected', { user });
  })

  //!Esto Funciona pero no guarda en Atlas
  const messages = await MessagesModel.find().lean();
  socket.emit('messages', { messages });

  socket.on('userMessage', async (messageData) => {
    const data = messageData;

    await MessagesModel.create(messageData);
    const messages = await MessagesModel.find().lean();
    console.log('messages', messages)
    console.log('messages', { messages })

    io.emit('messages', { messages });
  })

  //! Connection Finished
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected...`)
  })
})


