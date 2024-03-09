require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL_COLLECTION = 'loginTest'
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const sessionsRouter = require('./routes/sessions.router');
const viewsRouter = require('./routes/views.router');
const PORT = 8080;
const serverMessage = `Server running on port ${PORT}${MONGO_URL_COLLECTION}`;
const app = express();


// Mongoose Init & Connect
mongoose.connect(`${MONGO_URL}${MONGO_URL_COLLECTION}`)
  .then(() => {
    console.log('DB Connected Succesfully')
  })

// Session Settings (middleware)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `${MONGO_URL}`,
    ttl: 60 * 60
  })
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
