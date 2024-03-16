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
const PORT = 8080;
const serverMessage = `Server running on port ${PORT}`;
const app = express();

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
}))

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Routes
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);




const server = app.listen(PORT, () => {
  console.log(serverMessage);
})
