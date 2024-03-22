// Atlas DB Connection
/* require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL; */
const express = require('express');
const handlebars = require('express-handlebars');
const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('./utils');
const app = express();
const port = 8080;


// middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//! DB
const users = [{
  name: 'John',
  email: 'john@gmail.com',
  password: '1234'
}]


//! Views Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

//! API Routes
app.post('/api/register', (req, res) => {

  const { name, email, password } = req.body;

  if (users.find(u => u.email === email && u.password === password)) {
    return res.status(400).send({ status: 'error', error: 'User already exists' })
  }

  const user = { name, email, password };
  users.push(user);

  const accessToken = generateToken(user);

  res.send({ status: 'success', message: 'Successful register', accessToken });

})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }

  const accessToken = generateToken(user);

  res.send({ status: 'success', message: 'Successful login', accessToken });
})

app.get('/api/current', verifyToken, (req, res) => {
  res.send({ status: 'success', message: 'Successful login', payload: req.user });
})




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
