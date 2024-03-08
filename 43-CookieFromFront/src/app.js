const express = require('express');
const PORT = 8080;
const serverMessage = `Server running on port ${PORT}`
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');

const app = express();

// Body & Querys
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);
app.engine('handlebars', handlebars.engine());

// Public Folder
app.use(express.static(`${__dirname}/public`));

// Cookies
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.render('cookies');
})

app.post('/cookies', (req, res) => {
  const data = req.body;
  res.cookie('myCookie', data, { maxAge: 120 * 1000 });
  res.send({ status: 'success', message: 'Cookies has been set' })
})

app.get('/cookies', (req, res) => {
  const cookies = req.cookies;
  res.send({ status: 'success', payload: cookies });
})

const server = app.listen(PORT, () => {
  console.log(serverMessage);
})