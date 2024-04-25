const { Router } = require('express');
const { publicAccess, privateAccess } = require('../middlewares/middlewares');
const ViewsController = require('../controllers/views.controller');
const SessionsController = require('../controllers/sessions.controller');
const { verifyToken } = require('../middlewares/verifyToken.middleware');
const ChatViewController = require('../controllers/chat.controller');
const getRole = require('../middlewares/getRole.middleware');


const viewsRouter = Router();

// Routes
viewsRouter.get('/home', publicAccess, ViewsController.getHome)

viewsRouter.get('/realtimeproducts', ViewsController.getRealTimeProducts)

viewsRouter.get('/register', publicAccess, ViewsController.getRegister)

viewsRouter.get('/login', publicAccess, ViewsController.getLogin)

viewsRouter.get('/resetPassword', publicAccess, ViewsController.getResetPassword);

viewsRouter.get('/profile', privateAccess, ViewsController.getProfile)

viewsRouter.get('/current', privateAccess, SessionsController.getCurrentSession);

viewsRouter.get('/chat', verifyToken, getRole('user'), ViewsController.getChat);

viewsRouter.get('/*', publicAccess, ViewsController.getPublicRoute)

module.exports = viewsRouter;