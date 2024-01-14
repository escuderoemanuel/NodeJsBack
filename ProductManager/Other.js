/*


Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
Formato del entregable

Archivo de javascript con el nombre ProductManager.js
 */

/* 
 Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
Aspectos a incluir
*/
const fs = require('fs').promises;
const unicode = 'utf-8';

class ProductManager {

  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
    this.initializeFile();

  }

  async initializeFile() {
    try {
      const data = await fs.readFile(this.path, unicode);
      this.products = JSON.parse(data);
      console.log(`File '${this.path}' read successfully.`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Si el archivo no existe, se crea con un array vacío.
        await fs.writeFile(this.path, '[]', unicode);
        console.log(`File '${this.path}' created successfully.`);
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  }

  async getProducts() {
    return this.products;
  }
}

const manager = new ProductManager('./products.json');
manager.getProducts();
