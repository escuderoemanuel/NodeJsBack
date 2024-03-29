const { Router } = require('express');
const CartsDbManager = require('../dao/dbManager/CartsDbManager');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Managers
const cartManager = new CartsDbManager();
const productManager = new ProductsDbManager();

const router = Router();

// Deberá crear un nuevo carrito con id y products[].
router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.addCart();

    res.send({ status: 'success', payload: cart });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})


// Deberá listar todos los carritos (No lo pide el desafío).
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send({ status: 'success', carts: carts });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

// Deberá listar los productos que pertenezcan al carrito con el cid proporcionado, dando acceso a los datos del cart y de las propiedades de los productos que contenga.
router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    } else {
      const products = cart.products

      //res.send(cart);
      res.render('carts', { cartId: cart._id, products });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})





/* router.get('/:cid', async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await cartManager.getCartById(id);
    // console.log('cart', cart);
    //const products = cart.products
    // Hacer un map, para tener los products en un array
    const products = cart.products.map(product => product)
    //const products = cart.products.map(product => product._id )

    //const product1 = products[1]
    //console.log('cart.products', cart.products);
    console.log('cart.products', products);
    // console.log('productTitle', products[0].title);
    res.render('carts', { cartId: cart._id, products });
    // res.render('carts', cart); // Pasar los datos necesarios a la plantilla
    //res.send({ status: 'success', products });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}) */


// Deberá agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartManager.getCartById(cid);
    const product = await productManager.getProductById(pid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    }
    if (!product) {
      res.status(400).send('Product does not exist')

    } else {
      cartManager.addProductToCart(cid, pid);
      res.send({ status: 'success' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

// Deberá eliminar del carrito el producto seleccionado
router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartManager.getCartById(cid);
    const product = await productManager.getProductById(pid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    }
    if (!product) {
      res.status(400).send('Product does not exist')

    } else {
      cartManager.deleteProductFromCart(cid, pid);
      res.send({ status: 'success' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

// Deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    } else {
      cartManager.updateProductsFromCart(cid, req.body);
      res.send({ status: 'success' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})
// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const cart = await cartManager.getCartById(cid);
    const product = await productManager.getProductById(pid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    }
    if (!product) {
      res.status(400).send('Product does not exist')

    } else {
      cartManager.updateProductQuantityFromCart(cid, pid, quantity);
      res.send({
        status: 'success',
        message: 'Product quantity updated successfully'
      })
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

// DELETE: api/carts/:cid deberá eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(400).send('Cart does not exist')
    } else {
      cartManager.deleteAllProductsFromCart(cid);
      res.send({
        status: 'success',
        message: 'All products deleted successfully'
      })
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})


module.exports = router;