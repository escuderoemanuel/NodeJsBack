const { Router } = require('express');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');
const passport = require('passport');
const { generateToken, verifyToken } = require('../utils');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE_KEY



const sessionRouter = Router();

//? LOCAL

sessionRouter.post('/register', passport.authenticate('register', {
  failureRedirect: '/api/sessions/registrationFailed',
  session: false
}), async (req, res) => {
  res.send({ status: 'success', message: 'Successfully registered user.' });
});

sessionRouter.get('/registrationFailed', (req, res) => {
  res.status(401).send({ status: 'error', error: 'Registration failed.' });
})

sessionRouter.post('/login', passport.authenticate('login', {
  failureRedirect: '/api/sessions/loginFailed',
  session: false
}), async (req, res) => {

  const { _id, firstName, lastName, email, age, role, password, cart } = req.user;
  const serializableUser = {
    id: _id,
    firstName,
    lastName,
    email,
    age,
    role,
    password,
    cart
  }


  const accessToken = generateToken(serializableUser);
  /* const accessToken = jwt.sign(serializableUser, PRIVATE_KEY, { expiresIn: '1h' }); */
  res.cookie('accessToken', accessToken);

  res.send({ status: 'success', message: 'Successfully logged in' })
})

sessionRouter.get('/loginFailed', (req, res) => {

  res.status(401).send({ status: 'error', error: 'Login failed' });
})


sessionRouter.get('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.redirect('/login');
  /* req.session.destroy(err => {
    if (err) {
      res.status(500).send({ error: 'Error logging out' });
    } else {
      res.redirect('/login'); // Redirige a la página de login después de cerrar sesión.
    }
  }) */
})

sessionRouter.post('/resetPassword', async (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  try {

    if (!email || !password || !passwordConfirm) {
      return res.status(400).send({ error: 'Missing data' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Aquí podría enviar un correo electrónico para resetear la contraseña

    const hashedPassword = createHash(password);

    const result = await UserModel.updateOne(
      { _id: user._id }, {
      $set: { password: hashedPassword }
    });

    res.send({ status: 'success', message: 'Password reset', details: result });

  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
})



//? GITHUB
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false, failureRedirect: '/login' }), async (req, res) => { })

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {

  const { _id, firstName, lastName, email, age, role, password, cart } = req.user;

  const serializableUser = {
    id: _id,
    firstName,
    lastName,
    email,
    age,
    role,
    password,
    cart
  }

  /* const accessToken = jwt.sign(serializableUser, PRIVATE_KEY, { expiresIn: '1h' }); */
  /*  const accessToken = generateToken(serializableUser); */

  res.cookie('accessToken', accessToken);

  /* req.session.user = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role
  }; */

  res.redirect('/api/products')
});

sessionRouter.get('/current', verifyToken, (req, res) => {
  const user = req.tokenUser;
  res.send({ payload: user });
})


module.exports = sessionRouter;


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