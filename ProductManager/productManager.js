/* 




Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

*/

const fs = require('fs/promises');

const unicode = 'utf-8'
const file = './products.json';


// Realizar una clase de nombre “ProductManager”
class ProductManager {


  constructor() {
    // Debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
    this.path = file;
    // id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
    this.id = 1;
    // permitirá trabajar con múltiples productos
    this.products = [];
  }

  // Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado (title, description, price, thumbnail, code, stock), asignarle un id autoincrementable y guardarlo en el arreglo
  async addProduct(title, description, price, thumbnail, code, stock) {

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('All fields are required');
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.log('The product CODE already exists');
      return;
    }

    const product = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    this.products.push(product);

    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), unicode);
      console.log('Product added successfully');
    } catch (error) {
      console.log(`Error writing to file: ${error}`);
    }
  }

  // Consultar todos los Productos
  async getProducts() {
    try {
      const data = fs.promises.readFile(this.path, unicode);
      this.products = JSON.parse(data);
      return this.products;
    } catch (error) {
      console.log(`Error reading file: ${error}`);
      return [];
    }
  }

  // Consultar Producto por Id
  async getProductById(id) {
    try {
      const productFound = this.products.find(product => product.id === id);
      return productFound
    } catch (error) {
      console.log(`Product with id '${id}' not found`)
    }
  }

  // Modificar Producto
  async updateProduct(id, updatedProduct) {
    try {
      const productIndex = this.products.findIndex(product => product.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), unicode);
        console.log('Product updated successfully');
        return this.products[productIndex];
      } else {
        console.log(`Product with id '${id}' not found`);
        return null;
      }
    } catch (error) {
      console.log(`Error updating product: ${error}`);
      return null;
    }
  }

  // Eliminar Producto
  async deleteProduct(id) {
    try {
      const productIndex = this.products.findIndex(product => product.id === id);
      this.products.splice(productIndex, 1);
      await fs.writeFile(file, JSON.stringify(this.products));
      return this.products;
    } catch (error) {
      console.log(`Product with id '${id}' not found`);
      return;
    }
  }
}

// Testing => Descomentar el siguiente bloque para ejecutar el test 

const manager = new ProductManager();

console.log(manager.products)
console.log(manager.getProducts())

/* manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts())

console.log('manager.getProductById(id)')

console.log(manager.getProductById(1))
console.log(manager.getProductById(5)) */