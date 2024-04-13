const CartsDbManager = require('../dao/dbManager/CartsDbManager');
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');

// Managers
const cartManager = new CartsDbManager();
const productManager = new ProductsDbManager();

class CartsController {
  static async create(req, res) {
    try {
      const cart = await cartManager.addCart();
      res.send({ status: 'success', payload: cart });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const carts = await cartManager.getCarts();
      res.send({ status: 'success', carts: carts });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getById(req, res) {
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
  }

  static async addToCart(req, res) {
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
  }

  static async deleteFromCartById(req, res) {
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
  }

  static async updateById(req, res) {
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
  }

  static async updateQuantityById(req, res) {
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
  }

  static async emptyById(req, res) {
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
  }
}

module.exports = CartsController;