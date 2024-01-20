const express = require('express');

const port = 8080;
const serverMessage = `Server with Express running on port ${port}`

// Express Instance
const server = express();

server.use(express.json()); // Interpret Json
server.use(express.urlencoded({ extended: true })) // Complex params


let frase = 'Frase inicial'

// GET Frase Inicial
// localhost:8080/api/frase
server.get('/api/frase', (req, res) => {
  res.send({ status: 'success', frase })
})

// GET 
// localhost:8080/api/palabras/inicial
server.get('api/palabras/:pos', (req, res) => {
  const buscada = req.params.pos;

  if (frase.includes(buscada)) {
    return res.status(404), send({
      status: 'error', messagge: 'La palabra buscada no existe en la frase'
    })
  }
  res.send({ status: 'success', buscada: palabra })

})

// Run Server
server.listen(port, () => {
  console.log(serverMessage)
})


