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
// localhost:8080/api/palabras/1
server.get('/api/palabras/:pos?', (req, res) => {

  if (!req.params.pos) {
    res.status(400).send({
      status: 'error', messagge: 'No se ha introducido ningún valor'
    })
    return
  }

  let pos = parseInt(req.params.pos);

  if (pos === 1 || pos === 2) {

    pos -= 1;

    const palabras = frase.split(' ');
    const buscada = palabras[pos]

    res.send({ status: 'success', buscada: buscada })
  } else {
    res.status(404).send({
      status: 'error', messagge: 'La palabra buscada no existe en la frase'
    })
  }
})

//POST
// localhost:8080/api/palabras
server.post('/api/palabras', (req, res) => {

  const palabra = req.body.palabra;

  if (palabra) {
    frase = `${frase} ${palabra}`

    const palabras = frase.split(' ')
    const pos = palabras.length
    // Lo mismo que -> const palabras = frase.split(' ').length

    res.send({
      agregada: palabra,
      pos: pos
    })
  } else {
    res.status(400).send({
      status: 'error', messagge: 'No se agregó ninguna palabra'
    })
  }
})

//PUT
// localhost:8080/api/palabras/3
server.put('/api/palabras/:pos?', (req, res) => {

  let pos = parseInt(req.params.pos)
  pos -= 1
  const palabra = req.body.palabra;
  const palabras = frase.split(' ');

  if (pos && pos < palabras.length && palabra) {
    let anterior = palabras[pos];
    palabras[pos] = palabra;

    frase = palabras.join(' ');

    res.send({
      actualizada: palabra,
      anterior: anterior
    })
  } else {
    res.status(400).send({
      error: 'error', messagge: 'No existe la posicion o falta la palabra nueva'
    })
  }
})

// DELETE
// localhost:8080/api/palabras/2
server.delete('/api/palabras/:pos', (req, res) => {
  let pos = parseInt(req.params.pos)
  pos -= 1

  const palabras = frase.split(' ')
  palabras.splice(pos, 1)
  const palabra = palabras[pos]
  frase = palabras.join(' ')

  res.send({
    status: 'success',
    eliminada: palabra,
    frase
  })
})



// Run Server
server.listen(port, () => {
  console.log(serverMessage)
})


