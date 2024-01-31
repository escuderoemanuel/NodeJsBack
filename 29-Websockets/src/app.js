const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const viewsRouter = require('./routes/views.router');


// Express Settings
const app = express();
const port = 8080;
const serverMessage = `Server is running on port ${port}`;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Settings
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Router Settings
app.use('/', viewsRouter);

const server = app.listen(port, () => {
  console.log(serverMessage);
})

// Socket Settings
let chatMessages = [];
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chatMessage', (chatMessage) => {
    chatMessages.push({ socketId: socket.id, message: chatMessage });
    io.emit('newMessage', chatMessages);
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  })

  socket.emit('newMessage', chatMessages);
})

