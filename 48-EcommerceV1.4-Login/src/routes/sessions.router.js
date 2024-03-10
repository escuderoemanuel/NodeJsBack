const { Router } = require('express');
const userModel = require('../dao/models/user.model');

const sessionRouter = Router();

sessionRouter.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword, age, role } = req.body;

  if (!firstName || !lastName || !email || !password || !repeatPassword || !age) {
    return res.status(400).send({ status: 'error', error: 'Incomplete data' });
  }

  if (password.length < 8) {
    return res.status(400).send({ status: 'error', error: 'Password must be at least 8 characters' });
  }

  if (password !== repeatPassword) {
    return res.status(400).send({ status: 'error', error: 'Passwords do not match' });
  }

  //! Esto hay que manejarlo de otro modo!
  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    req.body.role = 'admin'
  }

  const result = await userModel.create({ firstName, lastName, email, password, age, role });

  res.send({ status: 'success', message: 'User registered' });
})

sessionRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: 'error', error: 'Incomplete data' });
  }

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.status(401).send({ status: 'error', error: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).send({ status: 'error', error: 'Invalid password' });
  }

  req.session.user = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    age: user.age,
  };

  const userPublicData = req.session.user;

  // Regreso userPublicData porque no contiene datos sensibles
  res.send({ status: 'success', payload: userPublicData, message: 'Successfully logged in' });
})


module.exports = sessionRouter;