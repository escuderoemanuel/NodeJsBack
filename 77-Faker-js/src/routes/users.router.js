const express = require('express');
const { generateUser } = require('../utils/generateUser');
const router = express.Router();

router.get('/', (req, res) => {
  const quantity = req.query.quantity || 5;
  const users = [];
  for (let i = 0; i < quantity; i++)
    users.push(generateUser(i));

  res.send({ status: 'success', payload: users });
});

module.exports = {
  usersRouter: router
}