const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const upload = require('../middlewares/upload.middleware');
const getRole = require('../middlewares/getRole.middleware');
const { verifyToken } = require('../middlewares/verifyToken.middleware');

const usersRouter = Router();

usersRouter.get('/premium/:uid', UsersController.changeRole);
usersRouter.post('/:uid/documents', upload.any(), UsersController.uploadDocuments)

usersRouter.get('/', verifyToken, getRole('admin'), UsersController.getAll);
usersRouter.delete('/', verifyToken, getRole('admin'), UsersController.deleteInactiveUsers)

/* 
- Desde el router de /api/users, crear tres rutas:
  - GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)

  - DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

 */

module.exports = usersRouter