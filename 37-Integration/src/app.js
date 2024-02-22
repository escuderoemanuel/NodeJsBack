require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const express = require('express');
const PORT = 8080;
const serverMessage = `Server is running on port ${PORT}`;
const app = express();
const usersRouter = require('./routes/users.router');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router');
const mongoose = require('mongoose');


/* DB Connection */
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/integration`)
  .then(() => {
    console.log('Connected Succesfully')
  })

/* Views Engine */
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

/* Middlewares */
app.use(express.json()); // body
app.use(express.urlencoded({ extended: true })); // query params
app.use('/api/users', usersRouter)
app.use('/', viewsRouter)

// Endpoints
app.get('/helloworld', (req, res) => {
  res.send({ message: 'Hello World' })
})


app.listen(PORT, () => console.log(serverMessage));