const { Router } = require('express');

//const Users = require('../dao/fileManagers/usersFileManager')
const Users = require('../dao/dbManagers/usersDbManager')
const router = Router();

const manager = new Users()

router.get('/', async (req, res) => {
  const users = await manager.getAll()
  res.render('users', { users: users }) // 'users' viene de
})

module.exports = router;