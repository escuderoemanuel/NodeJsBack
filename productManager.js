class ProductManager {
  #id = 1;

  constructor() {
    this.products = [];
  }

  // getProducts
  getProducts() {
    return this.products;
  }

  // addProduct
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {}
    product.id = this.#id++;
    product.title = title;
    product.description = description;
    product.price = price;
    product.thumbnail = thumbnail;
    product.code = code;
    product.stock = stock;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('All fields are required');
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.log('The product CODE already exists');
      return;
    }

    this.products.push(product);
  }

  // getProductById
  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.log('Product not found');
      //return;
    }
    else {
      return product;
    }
  }
}

// Test
const manager = new ProductManager();

console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

console.log('manager.getProductById(id)')

console.log(manager.getProductById(4))