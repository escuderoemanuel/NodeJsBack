const { fork } = require('child_process');
const express = require('express');
const { operation } = require('./utils');

const app = express();
const port = 3000;


app.get('/calculate-nonblock', (req, res) => {
  const child = fork(`${__dirname}/childProcess.js`)
  child.send('Start calculating')
  child.on('message', result => {
    console.log('message received', result)
    res.send({ result: result })
  })
})

app.get('/calculate-block', (req, res) => {
  const result = operation();
  res.send({ result })
})

let visitorsCounter = 0;

app.get('/', (req, res) => {
  visitorsCounter++;
  res.send(`hello world!!, visits number: ${visitorsCounter}`)
})


app.listen(port, () => console.log(`Running on port ${port}`));

//! Si se ejecuta el cálculo bloqueante, no puedo consultar la ruta '/', mientras que con el cálculo no bloqueante si puedo hacerlo.