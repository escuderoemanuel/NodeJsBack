const { Router } = require('express');
const BusinessController = require('../controllers/business.controller');
const BusinessRouter = Router();


BusinessRouter.get('/', BusinessController.getAll);

BusinessRouter.get('/:id', BusinessController.getById);

BusinessRouter.post('/', BusinessController.create);

BusinessRouter.post('/:id/item', BusinessController.addItem);

BusinessRouter.put('/:id', BusinessController.update);

BusinessRouter.delete('/:id', BusinessController.delete);


module.exports = BusinessRouter;



