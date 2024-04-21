const { Router } = require('express');
const OrdersController = require('../controllers/orders.controller');
const OrdersRouter = Router();


OrdersRouter.get('/', OrdersController.getAll);

OrdersRouter.get('/:id', OrdersController.getById);

OrdersRouter.post('/', OrdersController.create);

OrdersRouter.put('/:id', OrdersController.updateState);

OrdersRouter.put('/:id', OrdersController.update);

OrdersRouter.delete('/:id', OrdersController.delete);


module.exports = OrdersRouter;
