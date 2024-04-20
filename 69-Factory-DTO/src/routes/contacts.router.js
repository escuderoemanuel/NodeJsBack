const express = require('express');
const { Contacts } = require('../dao/factory.js');
//const Contacts = require('../dao/mongoDB/contacts.mongo');
//const Contacts = require('../dao/memory/contacts.memory');
const router = express.Router();

const contacts = new Contacts();


router.get('/', async (req, res) => {
  try {
    const result = await contacts.getAll();
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contacts.getById(id);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.post('/', async (req, res) => {
  const contact = req.body;
  try {
    const result = await contacts.create(contact);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contacts.update(id, req.body);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contacts.delete(id);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});


module.exports = {
  contactsRouter: router
};