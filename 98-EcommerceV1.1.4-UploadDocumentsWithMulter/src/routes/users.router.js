const { Router } = require('express');
const UsersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', UsersController.getAll);
usersRouter.get('/premium/:uid', UsersController.changeRole);


module.exports = usersRouter