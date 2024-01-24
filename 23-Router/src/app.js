const express = require('express');
const port = 8080;
const serverMessage = `Server up and running on port ${port}`
const usersRouter = require('./routes/users.router')
const petsRouter = require('./routes/pets.router')

const app = express();

// Middleware to Application Level
app.use((req, res, next) => {
  //console.log(req.method, req.url)
  next()
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// public folder is now to public access
app.use(express.static(__dirname + '/public'))


app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)

app.listen(port, () => {
  console.log(serverMessage)
})
