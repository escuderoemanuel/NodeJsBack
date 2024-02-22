const { Router } = require('express');
const Users = require('../dao/dbManagers/users.db')
const router = Router();

const manager = new Users()

router.get('/', async (req, res) => {
  const users = await manager.getAll()
  res.render('users', { users: users })
})

module.exports = router;