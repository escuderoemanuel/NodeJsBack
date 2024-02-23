const { Router } = require('express');
const MessagesDbManager = require('../dao/dbManager/MessagesDbManager');

// Manager
const manager = new MessagesDbManager();

const router = Router();

// Deberá crear un nuevo carrito con id y products[].
router.post('/', async (req, res) => {
  try {
    const message = await manager.addMessage();
    const messages = await manager.getMessages();

    res.status(201).send({ message: messages });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const messages = await manager.getMessages()
    res.render('messages', {
      messages,
      layout: 'main'
    })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;