
const getUsers = (req, res) => {
  res.send({ status: 'success', message: 'Getting all users' })
}

const getUserById = (req, res) => {
  // TODO get user by id
  res.send({ status: 'success', message: 'Getting one user' })
}

const createUser = (req, res) => {
  res.send({ status: 'success', message: 'Creating a user' })
}

const updateUser = (req, res) => {
  res.send({ status: 'success', message: 'Updating a user' })
}

const deleteUser = (req, res) => {
  res.send({ status: 'success', message: 'Deleting a user' })
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}