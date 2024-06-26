const { Router } = require('express');
const CartsController = require('../controllers/carts.controller');
const { verifyToken } = require('../middlewares/verifyToken.middleware');
const getRole = require('../middlewares/getRole.middleware');

const router = Router();

router.get('/', verifyToken, CartsController.getAll)
router.post('/', verifyToken, CartsController.create)
router.get('/:cid', verifyToken, CartsController.getById)
router.delete('/:cid', verifyToken, CartsController.emptyCartById)
router.get('/:cid/purchase', verifyToken, CartsController.purchase)
router.post('/:cid/product/:pid', verifyToken, getRole(['user', 'premium']), CartsController.addProductToCart)
router.delete('/:cid/product/:pid', CartsController.deleteProductById)
// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/product/:pid', verifyToken, CartsController.updateProductQuantityById)

module.exports = router;