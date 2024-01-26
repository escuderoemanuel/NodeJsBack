const express = require('express');
const port = 8080;
const serverMessage = `Server up and running on port ${port}`
const app = express();
const handlebars = require('express-handlebars')

// Indica cuál será el motor de la app
app.engine('handlebars', handlebars.engine())
// Indica dónde están las vistas
app.set('views', `${__dirname}/views`)
// Indica el motor de vistas
app.set('view engine', 'handlebars')

const name = 'Soquete'

app.get('/', (req, res) => {
  // Indica que va a renderizar vistas
  res.render('index', { title: 'Greeting!', name })
})



app.listen(port, () => {
  console.log(serverMessage)
})