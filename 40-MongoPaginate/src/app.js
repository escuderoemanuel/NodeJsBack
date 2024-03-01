require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const mongoose = require('mongoose');

const express = require('express')
const port = 8080;
const serverMessage = `Server is up and running on port ${port}`;
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router');

const app = express();

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`).then(() => {
  console.log('DB Connected Succesfully')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/** handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter)


app.listen(port, () => console.log(serverMessage))