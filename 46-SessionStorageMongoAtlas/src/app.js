require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const PORT = 8080
const serverMessage = `Server is running on port ${PORT}`
const MongoStore = require('connect-mongo')
const app = express();

// Para usar el body request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Session

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`,
    ttl: 10
  }),
}))

//! Methods
// Simil DB (Paso el password como string o debo parsear el resultado. El username debería ser case sensitive)
const users = [
  { username: 'janedoe', password: 1234, isAdmin: true },
  { username: 'johndoe', password: 5678, isAdmin: true }
]

// Test => localhost:8080/login?username=janedoe&password=1234
app.get('/login', (req, res) => {
  // Obtengo username y password de la ruta
  let { username, password } = req.query;
  //username = username.toLowerCase(); => Si debe ser case sensitive
  password = parseInt(password);

  // Busco en el array de usuarios si existe el usuario y la contraseña ingresados. Si no existe, retorno un error. Si existe, retorno un mensaje de éxito.
  const user = users.find(user => user.username === username && user.password === password)
  if (!user) {
    return res.status(400).send('Invalid credentials')
  }

  req.session.username = username;
  req.session.admin = user.isAdmin;
  req.session.visitCounter = 0;

  res.send({ status: 'Successful login', isAdmin: req.session.admin })
})

// Test => localhost:8080/private?name=Jane
app.get('/private', authenticated, (req, res) => {

  const name = req.query.name || '😀';

  req.session.visitCounter++;
  if (req.session.visitCounter === 1) {
    res.send(`
      Welcome ${name}! 👋 Lalala</br>
      You are now logged in!</br>
      This is your first visit 🎊
  `)
  } else {
    res.send(`
      Welcome again ${name}!  👋</br>
      You are now logged in!</br>
      Visited ${req.session.visitCounter} times 🎊
  `)

  }

})

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send({ status: 'error', error: error })
    }
    res.send('Session ended...')
  })
})




// MIDDLEWARE (Funciones que se ejecutan antes de que lleguen a las rutas y tiene 3 parámetros)
function authenticated(req, res, next) {
  if (req.session.username) {
    next()
  } else {
    res.status(401).send('Not authenticated')
  }
}




const server = app.listen(PORT, () => {
  console.log(serverMessage)
})