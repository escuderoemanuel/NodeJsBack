const CartsModel = require('../models/carts.model');


class CartManager {

  //! ADD
  async addCart() {
    const cart = { items: [] }
    try {
      await CartsModel.create(cart);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET BY ID
  async getCartById(id) {
    try {
      const cart = await CartsModel.findOne({ _id: id }).lean();
      return cart;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! ADD ITEM
  async addProductToCart(cid, pid) {
    try {
      //      const cart = await this.getCartById(cid);
      const cart = await CartsModel.findOne({ _id: id }).lean();


      const product = cart.items.find(item => item.product === pid);
      if (product) {
        product.quantity++;
      } else {
        cart.items.push({ product: pid, quantity: 1 });
      }
      await CartsModel.updateOne({ _id: cid }, cart);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /*  constructor(path) {
     this.path = path;
     this.carts = [];
   } */

  /* async getItems() {
    const items = await CartsModel.find().lean();
    return items;
  }

  // Deberá agregar un nuevo carrito al archivo JSON
  async addCart() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding);
      }

      const products = []

      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = JSON.parse(data);

      const id = parsedData.length > 0 ? parsedData[parsedData.length - 1].id + 1 : 1;
      // Add new cart to the Carts
      const newCart = { id, products };


      parsedData.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(parsedData, null, 2), encoding);
      return newCart;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //Este no lo pide el desafío 
  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding);
      }

      const data = await fs.promises.readFile(this.path, encoding);
      this.carts = await JSON.parse(data);
      return this.carts
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // Deberá listar los productos que pertenezcan al carrito con el parámetro *'cid'* proporcionados.
  async getCartById(id) {
    try {
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = JSON.parse(data);

      // Find the cart with the specified id.
      const cart = parsedData.find(cart => cart.id === id);
      if (cart) {
        return cart;
      } else {
        throw new Error(`Cart with id '${id}' not found!`)
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

  // Deberá agregar el producto al arreglo “products” del carrito seleccionado '/:cid/product/:pid'
  async addProductToCart(cid, pid) {
    try {

      // Read carts.json file.
      const cartsData = await fs.promises.readFile(this.path, encoding);
      const cartsParsedData = await JSON.parse(cartsData);

      // Find the cart with the specified id.
      const cart = cartsParsedData.find(cart => cart.id === cid);

      //
      if (cart) {

        // Read products.json file.
        const productsData = await fs.promises.readFile(`${__dirname}/files/products.json`, encoding);
        const productsParsedData = JSON.parse(productsData);

        // Find the cart with the specified id in products.json file!
        const productInProducts = productsParsedData.find(product => product.id === pid);

        if (!productInProducts) {
          throw new Error(`Product with id '${pid}' does not exist in the product list!`)
        }

        // Find in the cart, the product with the specified id.
        const productInCart = cart.products.find(product => product.id === pid);

        // If the product already exist in the cart...
        if (productInCart) {
          productInCart.quantity++;

          // If the product not exist in the cart ...
        } else {
          cart.products.push({ id: pid, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(cartsParsedData, null, 2), encoding);
        return cart;
      } else {
        throw new Error(`Cart with id '${cid}' not found!`)
      }

    } catch (error) {
      throw new Error(error.message)
    }
  } */
}

// Exportación para utilizar en el app.js
module.exports = CartManager;