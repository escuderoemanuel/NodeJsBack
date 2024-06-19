const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const upload = require('../middlewares/upload.middleware');
const getRole = require('../middlewares/getRole.middleware');
const { verifyToken } = require('../middlewares/verifyToken.middleware');

const usersRouter = Router();

usersRouter.get('/premium/:uid', verifyToken, UsersController.changeRole);
usersRouter.post('/:uid/documents', verifyToken, upload.any(), UsersController.uploadDocuments)
usersRouter.delete('/:uid', verifyToken, getRole('admin'), UsersController.delete)

usersRouter.get('/', verifyToken, getRole('admin'), UsersController.getAll);
usersRouter.delete('/', verifyToken, getRole('admin'), UsersController.deleteInactive)


module.exports = usersRouter