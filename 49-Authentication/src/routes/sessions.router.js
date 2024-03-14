const { Router } = require('express');
const userModel = require('../models/user');
const session = require('express-session');
const passport = require('passport');

const sessionsRouter = Router();

/* 
//! Endpoints
// Post Register
sessionsRouter.post('/register', async (req, res) => {

  // Recibo los datos destructurados
  const { firstName, lastName, email, age, password } = req.body;

  // Valido los campos
  if (!firstName || !lastName || !email || !age || !password) {
    return res.status(400).send({ status: 'error', message: 'Incomplete data' })
  }

  // Creo un user con el model, con las mismas props que recibí del body y lo guardo en result
  const result = await userModel.create({ firstName, lastName, email, age, password });
  res.send({ status: 'success', message: 'User registered', payload: result })
})



sessionsRouter.post('/login', async (req, res) => {
  // Recibo los datos destructurados
  const { email, password } = req.body;

  // Valido los campos
  if (!email || !password) {
    return res.status(400).send({ status: 'error', message: 'Incomplete data' })
  }

  // Busco el user en la DB
  const user = await userModel.findOne({ email, password });

  // Si no lo encuentra devuelvo un 404
  if (!user) {
    return res.status(401).send({ status: 'error', message: 'User not found' })
  }

  // Si la contraseña no coincide devuelvo un 404
  if (user.password !== password) {
    return res.status(401).send({ status: 'error', message: 'Wrong password' })
  }

  // Si todo está bien, creo una session y la guardo en el req.session
  req.session.user = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
    //! No enviamos información sensible como el password!
  };
  res.send({ status: 'success', message: 'User logged in', payload: req.session.user })
  // Enviamos el 'req.session.user' y no el 'user' porque este último tiene datos sensibles

})

sessionsRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ status: 'error', message: 'Error logging out' })
    }
    res.redirect('/login') // <- Redirección desde el front
  })
}) */

//? GUTHUB
sessionsRouter.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}), async (req, res) => { })

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
  req.session.user = {
    name: req.user.firstName,
    email: req.user.email,
    age: req.user.age,
  };
  res.redirect('/home')

})


module.exports = sessionsRouter;