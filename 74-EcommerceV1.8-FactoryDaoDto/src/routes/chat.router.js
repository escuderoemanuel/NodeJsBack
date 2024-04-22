const { Router } = require('express');
const { privateAccess } = require('../middlewares/middlewares');
const ChatViewController = require('../controllers/chat.controller');


// Manager
const router = Router();

router.post('/', privateAccess, ChatViewController.postMessage) //! Todo: Chequear que el privateAccess sea el correcto

router.get('/', privateAccess, ChatViewController.getMessages)

module.exports = router;