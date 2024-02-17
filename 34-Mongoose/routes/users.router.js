const { Router } = require('express');
const UserModel = require('../models/user');

const router = Router();

router.get('/', async (req, res) => {
  const users = await UserModel.find()
  res.send({ status: 'success', users: users })
})

router.post('/', async (req, res) => {
  try {
    await UserModel.create(req.body)
    res.send({ status: 'success' })
  } catch (error) {
    res.status(400).send({ status: 'error', error: 'Incomplete Data' })
  }
})

router.put('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { firstName, lastName, age, email } = req.body;
    await UserModel.updateOne({ _id: uid }, { firstName, lastName, age, email })
    res.send({ status: 'success' })
  } catch (error) {
    res.status(400).send({ status: 'error', error: 'Incorrect Data' })
  }
})

router.delete('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    await UserModel.deleteOne({ _id: uid })
    res.send({ status: 'success' })
  } catch (error) {
    res.status(400).send({ status: 'error', error: 'Incorrect Data' })
  }
})

module.exports = router;