const express = require('express');
const port = 8080;
const serverMessage = `Server up and running on port ${port}`
const app = express()
const handlebars = require('express-handlebars')


// Indicates which engine will be instantiated for the app
app.engine('handlebars', handlebars.engine())
// Indicates where the views are
app.set('views', `${__dirname}/views`)
// Indicates the initialized engine that we are going to use for the views
app.set('view engine', 'handlebars')

// Indicates which is the access public folder
app.use(express.static(`${__dirname}/public`))
// To read json files
app.use(express.json());
// To receive http data sent from the client, in the body of the request
app.use(express.urlencoded({ extended: true }))

/* 
Utilizar la misma estructura, para poder levantar un servidor que utilice handlebars como motor de plantillas. 
Configurar la plantilla para que muestre los siguientes datos: nombre, apellido, edad, correo, teléfono.
Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada uno con los datos mencionados arriba.
Al llamar al método get ‘/’, generar un número random para elegir a alguno de los usuarios y mostrar el usuario seleccionado al azar en la plantilla.
Observar los diferentes resultados en el navegador. 
 */

const users = [
  { name: 'Steven', lastName: 'Adler', age: 57, email: 'drummer@gmail.com', phone: 549261222222 },
  { name: 'Axl', lastName: 'Rose', age: 59, email: 'axl@gmail.com', phone: 549261222223 },
  { name: 'Saul', lastName: 'Hudson', age: 58, email: 'slash@gmail.com', phone: 549261222224 },
  { name: 'Duff', lastName: 'McKagan', age: 57, email: 'duffbass@gmail.com', phone: 549261222225 },
  { name: 'Izzy', lastName: 'Stradlin', age: 58, email: 'izzy@gmail.com', phone: 549261222226 },
]



app.get('/', (req, res) => {
  // It must be here, so that it is a new random number on each page refresh
  const pos = Math.floor(Math.random() * users.length)
  // Render 'index', with 'users[pos]' 
  res.render('index', { user: users[pos] })
})


app.listen(port, () => {
  console.log(serverMessage)
})