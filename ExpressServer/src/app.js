//? Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. Además de configurar los siguientes endpoints:

// ES6 Sintax (type:module)
import express from 'express';

// const express = require('express');

const server = express();

//? El endpoint del método GET a la ruta ‘/greeting’ deberá devolver un html con el texto ‘Hello World from Express.js’.
server.get('/greeting', (req, res) => {
  res.send('<h2>Greeting: Hello World from Express.js</h2>');
})

//? El endpoint del método GET a la ruta  ‘/welcome’ deberá devolver un html con letras en color azul, en una string, dando la bienvenida.
server.get('/welcome', (req, res) => {
  res.send
    ('<p style="color: blue" >Hi, welcome to Express.js</p>');
})

//? El endpoint del método GET a la ruta ‘/user’ deberá devolver un objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}

const user = {
  name: 'Emanuel',
  lastname: 'Escudero',
  age: 37,
  email: 'emanuel@gmail.com'
}
server.get('/user', (req, res) => {
  // El objeto podría estar definido aquí o en otro archivo e importado
  res.send(user);
})

//? El endpoint del método GET a la ruta ‘/param/:name’.
server.get('/param/:name', (req, res) => {
  res.send(`<h2>Hello ${req.params.name}</h2>`);
})

//? El endpoint del método GET a la ruta ‘/params/:name/:apellido’.
server.get('/params/:name/:lastname', (req, res) => {
  const { name, lastname } = req.params;
  res.send(`<h2>Hello ${name} ${lastname}</h2>`);
})

//? Llamada al servidor en el puerto 8080.
server.listen(8080, () => {
  console.log('Server is run on port 8080..')
})