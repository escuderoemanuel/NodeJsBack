const { cartsService, productsService } = require('../repositories');

class CartsController {

  static async create(req, res) {
    try {
      const cart = await cartsService.create()
      res.send({ status: 'success', payload: cart });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const carts = await cartsService.getAll();
      res.send({ status: 'success', carts: carts });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await cartsService.getById(cid);
      if (!cart) {
        res.status(400).send('Cart does not exist')
      } else {
        // res.send(cart);
        res.render('userCart', { ...cart });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async addProductToCart(req, res) {
    console.log('HEREE')
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      //console.log('cid:', cid, 'pid:', pid) //! OK
      const cart = await cartsService.addProduct(cid, pid);
      //console.log('cart', cart) //!OK
      res.send({ status: 'success', cart });
    } catch (error) {
      console.log(error)

      res.status(400).send({ error: error.message });
    }
  }

  static async deleteProductById(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await cartsService.deleteProductFromCartById(cid, pid);
      res.send({ status: 'success', message: 'Product successfully removed', result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }


  static async updateProductQuantityById(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const quantity = req.body.quantity;
      await cartsService.updateProductQuantity(cid, pid, quantity);
      res.send({
        status: 'success',
        message: 'Product quantity successfully updated'
      })
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async emptyCartById(req, res) {
    try {
      const cid = req.params.cid;
      await cartsService.deleteAllProducts(cid);
      res.send({
        status: 'success',
        message: 'All products successfully removed'
      })
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }


  static async getProducts(req, res) {
    try {
      const { docs, ...rest } = await productsService.getAll(req.query);
      const cart = await cartsService.getById(req.user.cart)
      res.render('userCart', { products: docs, user: req.user, cart, ...rest })
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  }

  /* static async purchase(req, res) {
    const { cid } = req.params
    console.log('CLG cartsController purchase cid', cid)
    const email = req.user.email
    console.log('CLG cartsController purchase email', email)
    try {
      const remainderProducts = await cartsService.purchase(cid, email)
      console.log('CLG cartsController purchase reamainderProducts', remainderProducts)

      res.send({ status: 'success', message: 'Purchase successful', payload: remainderProducts })

    } catch (error) {
      console.log('CLG Cart purchase error', error)
      res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  } */
  static async purchase(req, res) {
    console.log('Entrando a cart controller purchase')
    const { cid } = req.params;
    console.log('Entrando a cart controller purchase cid', cid)
    try {
      const remainderItems = await cartsService.purchase(cid, req.user.email)
      res.send({ status: 'success', payload: remainderItems })
    } catch (error) {
      console.log(error)
      return res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  }
}

module.exports = CartsController;