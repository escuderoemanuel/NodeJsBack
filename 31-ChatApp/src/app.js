const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router');
const PORT = 8080;
const sererMessage = `Server is running on port ${PORT}`;

// Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public Folder
app.use(express.static(`${__dirname}/public`));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Routes
app.use('/', viewsRouter);

// Express
const httpServer = app.listen(PORT, () => {
  console.log(sererMessage)
})

// Socket io
const io = new Server(httpServer);

let messages = [];


io.on('connection', (socket) => {
  console.log(`User with id:${socket.id} connected...`);

  socket.on('userMessage', (messageData) => {
    messages.push(messageData);
    io.emit('serverMessages', { messages: messages });
  })
  socket.on('disconnect', () => {
    console.log(`User with id:${socket.id} disconnected...`);
  })

})