const { Router } = require('express');
const { verifyToken } = require('../middlewares/verifyToken.middleware');
const ProductsController = require('../controllers/products.controller');
const getRole = require('../middlewares/getRole.middleware');

const router = Router();

// Deberá traer todos los productos de la base de datos, incluyendo opcionalmente limit, page, sort, filter (Example: http://localhost:8080/api/products?limit=2&page=1&sort=desc&filter=iphone)
//router.get('/', verifyToken, ProductsController.getAll)
router.get('/', ProductsController.getAll)

// Deberá traer sólo el producto con el id proporcionado
//router.get('/:pid', verifyToken, ProductsController.getById)
router.get('/:pid', ProductsController.getById)

// Deberá agregar un nuevo producto
//router.post('/', verifyToken, getRole('admin'), ProductsController.create);
router.post('/', ProductsController.create);

// Deberá actualizar un producto existente con el id proporcionado.
// router.put('/:pid', verifyToken, getRole('admin'), ProductsController.update)
router.put('/:pid', ProductsController.update)

// Deberá eliminar un producto existente con el id proporcionado.
// router.delete('/:pid', verifyToken, getRole('admin'), ProductsController.delete)
router.delete('/:pid', ProductsController.delete)

module.exports = router;