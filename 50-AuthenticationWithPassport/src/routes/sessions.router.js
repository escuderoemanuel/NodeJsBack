const { Router } = require('express');
const userModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');
const passport = require('passport');


const sessionRouter = Router();

// Endpoints
sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerFail' }), async (req, res) => {
  try {
    /* const { firstName, lastName, email, password, repeatPassword, age, role } = req.body;

    if (!firstName || !lastName || !email || !password || !repeatPassword || !age) {
      return res.status(400).send({ status: 'error', error: 'Incomplete data' });
    }

    if (password.length < 8) {
      return res.status(400).send({ status: 'error', error: 'Password must be at least 8 characters' });
    }

    if (password !== repeatPassword) {
      return res.status(400).send({ status: 'error', error: 'Passwords do not match' });
    }

    const hashedPassword = createHash(password);

    const result = await userModel.create({ firstName, lastName, email, password: hashedPassword, age, role }); */


    res.send({ status: 'success', message: 'User registered' });
  } catch (error) {
    res.status(400).send({ error: error.message });

  }
})

sessionRouter.get('/registerFail', (req, res) => {
  res.status(401).send({ status: 'error', error: 'Registration failed' });

})

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginFail' }), async (req, res) => {

  const user = req.user;
  req.session.user = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
    role: user.role
  }

  res.send({ status: 'success', payload: req.session.user, message: 'Successfully logged in' })
})

sessionRouter.get('/loginFail', (req, res) => {
  res.status(401).send({ status: 'error', error: 'Login failed' });
})


sessionRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send({ error: 'Error logging out' });
    } else {
      res.redirect('/login'); // Redirige a la página de login después de cerrar sesión.
    }
  })
})

sessionRouter.post('/resetPassword', async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {

    if (!email || !password || !passwordConfirm) {
      return res.status(400).send({ error: 'Missing data' });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Aquí podría enviar un correo electrónico para resetear la contraseña

    const hashedPassword = createHash(password);

    const result = await userModel.updateOne(
      { _id: user._id }, {
      $set: { password: hashedPassword }
    });

    res.send({ status: 'success', message: 'Password reset', details: result });

  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }

})

module.exports = sessionRouter;