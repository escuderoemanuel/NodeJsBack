class ProductManager {
  #id = 1;

  constructor() {
    this.products = [];
  }

  // addProduct
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.#id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('All fields are required');
      return;
    }

    // Next condition also works with the 'find' method
    // 'find' return the OBJECT and 'some' return a BOOLEAN
    if (this.products.some(product => product.code === code)) {
      console.log('The product CODE already exists');
      return;
    }

    this.products.push(product);
    console.log('Product added successfully!')
  }

  // getProducts
  getProducts() {
    return this.products;
  }

  // getProductById
  getProductById(id) {
    const productFound = this.products.find(product => product.id === id);
    return productFound ??
      `Product with id '${id}' not found`
  }
}

// Testing => Descomentar el siguiente bloque para ejecutar el test 

/* const manager = new ProductManager();

console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

console.log('manager.getProductById(id)')

console.log(manager.getProductById(1))
console.log(manager.getProductById(5)) */