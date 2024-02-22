const { Router } = require('express');
const Users = require('../dao/dbManagers/usersDbManager');

const router = Router();

const manager = new Users();

router.get('/', async (req, res) => {
  const users = await manager.getAll()
  res.send({ status: 'success', users })
})

router.post('/', async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ status: 'Error', error: 'No data provided' })
  }
  await manager.saveUser(req.body)
  res.send({ status: 'success' })

})

module.exports = router;