const express = require('express');
const ContactsDTO = require('../dao/DTOs/contacts.dto.js');
const { contactsService } = require('../repositories');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await contactsService.getAll();
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contactsService.getById(id);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.post('/', async (req, res) => {
  //const contact = req.body;
  try {
    const contact = new ContactsDTO(req.body);
    const result = await contactsService.create(contact);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contactsService.update(id, req.body);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await contactsService.delete(id);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ status: 'error', error });
  }
});

module.exports = {
  contactsRouter: router
};