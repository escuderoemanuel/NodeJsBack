const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const UsersRouter = Router();

UsersRouter.get('/', UsersController.getAll);

UsersRouter.get('/:id', UsersController.getById);

UsersRouter.post('/', UsersController.create);

UsersRouter.put('/:id', UsersController.update);

UsersRouter.delete('/:id', UsersController.delete);

module.exports = UsersRouter;