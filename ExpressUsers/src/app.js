import express from 'express';

const server = express();

// This way the server will be able to read complex data
server.use(express.urlencoded({ extended: true }))

const users = [
  { id: '1', name: 'John', lasname: 'Doe', gender: 'male' },
  { id: '2', name: 'Jane', lasname: 'Doe', gender: 'female' },
  { id: '3', name: 'Bob', lasname: 'Smith', gender: 'male' },
  { id: '4', name: 'Alice', lasname: 'Johnson', gender: 'female' },
  { id: '5', name: 'David', lasname: 'Lee', gender: 'male' },
  { id: '6', name: 'Emily', lasname: 'Brown', gender: 'female' },
];


// Search by id
server.get('/', (req, res) => {
  let result = users;
  const gender = req.query.gender;
  if (gender) {
    result = result.filter(user => user.gender === gender)
  }
  res.send({ users: result })
})


// Return all users
server.get('/', (req, res) => {
  res.send({ users })
})




// Query by any param (Don't work after '/:userId')
server.get('/query', (req, res) => {
  const consults = req.query;
  res.send(consults)
})


// Search by id
server.get('/:userId', (req, res) => {
  const id = req.params.userId;
  const user = users.find(user => user.id === id)
  if (!user) {
    return res.status(404).send({ error: 'User not found' })
  }
  res.send({ user: user })
})



server.listen(3000, () => {
  console.log('Server running on port 3000');
})