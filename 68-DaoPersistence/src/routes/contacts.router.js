const express = require('express');
//const Contacts = require('../dao/mongoDB/contacts.mongo');
const Contacts = require('../dao/memory/contacts.memory');
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


module.exports = {
  contactsRouter: router
};