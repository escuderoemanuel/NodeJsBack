const { Router } = require('express');
const MessagesModel = require('../dao/models/messages.model');
const { publicAuthentication, privateAuthentication } = require('../middlewares/middlewares');
const ChatViewController = require('../controllers/chatView.controller');


// Manager
const router = Router();

router.post('/', ChatViewController.postMessage)

router.get('/', privateAuthentication, ChatViewController.getMessages)

module.exports = router;