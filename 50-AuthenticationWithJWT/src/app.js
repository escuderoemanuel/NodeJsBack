// Credentials
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

// Mongo - Mongoose
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

//Handlebars - Routers
const handlebars = require('express-handlebars');
const sessionsRouter = require('./routes/sessions.router');
const viewsRouter = require('./routes/views.router');

// Passport
const passport = require('passport');
const initializePassport = require('./config/passport.config');

// Express
const express = require('express');
const session = require('express-session');
const { generateToken, authToken } = require('./utils');
const PORT = 8080;
const serverMessage = `Server running on port ${PORT}`;
const app = express();

/* 
// Mongoose Init & Connect
mongoose.connect(`${MONGO_URL}`)
  .then(() => {
    console.log('DB Connected Succesfully')
  })

// Passport
initializePassport();
app.use(passport.initialize());

// Session Settings (middleware)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
})) */

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// DataBase
const users = [{
  firstName: 'Claire',
  lastName: 'Fraser',
  age: '45',
  email: 'claire@gmail.com',
  password: '1234'
}];

// View Routes
app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/home', (req, res) => {
  res.render('home')
})

// API Routes
app.post('/api/register/', (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400)
      .send({ error: 'User already exists' })
  }

  const user = { firstName, lastName, age, email, password };
  users.push(user);

  //!
  console.log(users)

  const accessToken = generateToken(user);
  res.send({ status: 'success', message: 'Successful register', accessToken })
})

app.post('/api/login/', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(400)
      .send({ error: 'Invalid credentials' })
  }

  const accessToken = generateToken(user);
  res.send({ status: 'success', message: 'Successful login', accessToken })
})

app.get('/api/current/', authToken, (req, res) => {
  res.send({ status: 'success', message: 'Successful login', payload: req.user })
})

const server = app.listen(PORT, () => {
  console.log(serverMessage);
})
