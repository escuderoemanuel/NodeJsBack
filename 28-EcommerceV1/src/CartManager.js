const fs = require('fs');
const ProductManager = require('./ProductManager');

const encoding = 'utf8';

class CartManager {

  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async addCart(products) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding);
      }

      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = JSON.parse(data);

      const id = parsedData.length > 0 ? parsedData[parsedData.length - 1].id + 1 : 1;
      // Add new cart to the Carts
      const newCart = { id, products: products || [] };


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

  // Deberá agregar el producto al arreglo “products” del carrito seleccionado
  async addProductToCart(cid, pid) {
    try {
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = await JSON.parse(data);

      // Find the cart with the specified id.
      const cart = parsedData.find(cart => cart.id === cid);

      /* // Read the products json file.
      const productInProducts = await fs.promises.readFile('./files/products.json', encoding)
      const parsedProducts = await JSON.parse(productInProducts)

      // Find if product exist in the products json file
      const product = parsedProducts.find(product => product.id === pid)

      // If product not exist throw error.
      if (!product) {
        throw new Error(`Product with id '${pid}' not found!`)
      } */

      // If cart exist...
      /*  const productInProducts = await ProductManager.getProductById(pid) */
      if (cart) {

        // Find in the cart, the product with the specified id.
        const product = cart.products.find(product => product.id === pid);

        // If the product already exist in the cart...
        if (product) {
          product.quantity++;

          // If the product not exist in the cart ...
        } else {
          cart.products.push({ id: pid, quantity: 1 });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(parsedData, null, 2), encoding);
        return cart;
      } else {
        throw new Error(`Cart with id '${cid}' not found!`)
      }

    } catch (error) {
      throw new Error(error.message)
    }
  }

}

module.exports = CartManager;
