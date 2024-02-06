const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router');
const PORT = 8080;
const sererMessage = `Server is running on port ${PORT}`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);




const httpServer = app.listen(PORT, () => {
  console.log(sererMessage)
})


const io = new Server(httpServer);
io.on('connection', (socket) => {
  console.log(`User with id:${socket.id} connected...`);


  socket.on('disconnect', () => {
    console.log(`User with id:${socket.id} disconnected...`);
  })

})