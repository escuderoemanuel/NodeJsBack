const { Router } = require('express');
const { publicAccess, privateAccess } = require('../middlewares/middlewares');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');
const ViewsController = require('../controllers/views.controller');
const ChatViewController = require('../controllers/chat.controller');

const productsManager = new ProductsDbManager();

const viewsRouter = Router();

// Routes
viewsRouter.get('/home', publicAccess, ViewsController.getHome)

viewsRouter.get('/realtimeproducts', privateAccess, ViewsController.getRealTimeProducts)

viewsRouter.get('/register', publicAccess, ViewsController.getRegister)

viewsRouter.get('/login', publicAccess, ViewsController.getLogin)

viewsRouter.get('/resetPassword', publicAccess, ViewsController.getResetPassword);

viewsRouter.get('/profile', privateAccess, ViewsController.getProfile)

viewsRouter.get('/*', publicAccess, ViewsController.getPublicRoute)



module.exports = viewsRouter;