const express = require('express');

const port = 8080;
const serverMessage = `Server running on port ${port}`;
const server = express();

server.use(express.json()); // interpret json
server.use(express.urlencoded({ extended: true })); // complex params

let users = []

// GET
server.get('/api/user', (req, res) => {
  res.send({ status: 'success', data: users })
})

// POST
server.post('/api/user', (req, res) => {
  let newUser = req.body;
  users.push(newUser);

  if (!newUser.first_name) {
    return res.status(400).send({ status: 'error', message: 'First name is required!' })
  }

  res.send({ status: 'success', message: 'User created successfully!' })
})

// PUT
server.put('/api/user/:id', (req, res) => {
  let id = parseInt(req.params.id); // Parse id to avoid errors when comparing
  let user = req.body;

  let index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).send({ status: 'error', message: 'User does not exist!' })
  }

  users[index] = user;

  res.send({ status: 'success', message: 'User updated successfully!' })
})

// DELETE
server.delete('/api/user/:id', (req, res) => {
  let id = parseInt(req.params.id); // Parse id to avoid errors when comparing

  /* 
  let index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).send({ status: 'error', message: 'User does not exist!' })
  }
  users.splice(index, 1);
  */

  users = users.filter(user => user.id !== id); // This option works and is shorter than the previous one

  res.send({ status: 'success', message: 'User deleted successfully!' })
})



server.listen(port, () => {
  console.log(serverMessage);
})