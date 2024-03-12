// Atlas DB Connection
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

// Mongoose Init & Connect
const mongoose = require('mongoose');
mongoose.connect(`${MONGO_URL}`)
  .then(() => {
    console.log('DB Connected Succesfully')
  })
const MongoStore = require('connect-mongo');

// Solamente traemos Server de io
const { Server } = require('socket.io');

// Handlebars
const handlebars = require('express-handlebars');

// Express
const express = require('express');
const PORT = 8080;
const serverMessage = `Server is running on port ${PORT}`;
const app = express();

// Session Settings
const session = require('express-session');
app.use(session({
  secret: 'milusaveme',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `${MONGO_URL}`, ttl: 60 * 60 }),
}))

// Public Folder
app.use(express.static(`${__dirname}/public`))

// Json & Body Params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Server
const server = app.listen(PORT, () => {
  console.log(serverMessage)
})