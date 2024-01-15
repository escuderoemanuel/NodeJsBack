const fs = require('fs');
const encoding = 'utf-8';

// Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.createFile();
  }

  async createFile() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding)
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  // Debe tener un método 'getProducts', el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
  async getProducts() {
    let info = {}
    try {
      if (fs.existsSync(this.path)) {
        info = await fs.promises.readFile(this.path, encoding)
        this.products = await JSON.parse(info)
        console.log('Products found: ', this.products)
        return this.products;
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
    return this.products;
  }

  //Debe guardar objetos con el siguiente formato: id, title, description, price, thumnail, code, stock
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const data = await fs.promises.readFile(this.path, encoding);
      const info = await JSON.parse(data);

      if (info.find(prod => prod.code === code)) {
        console.log('El producto ya existe');
      } else {
        const id = info.length > 0 ? info[info.length - 1].id + 1 : 1;
        const product = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
        };
        info.push(product);

        // Guardar la información actualizada en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(info, null, 2), encoding);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  // Debe tener un método 'getProductById', el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.path, encoding);
      const info = await JSON.parse(data);

      const product = info.find(product => product.id === id);

      if (product) {
        console.log('Producto encontrado:', product);
        return product;
      } else {
        console.log('Producto no encontrado');
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }

  }

  // Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
  async updateProduct(id, field) {
    try {
      // Array of fields that can be modified
      const validFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

      // Verify if the field is valid
      if (typeof field !== 'object' || Object.keys(field).length === 0 || !Object.keys(field).some(key => validFields.includes(key))) {
        throw new Error('The product cannot be modified. Invalid field.');
      }

      const data = await fs.promises.readFile(this.path, encoding);
      const info = await JSON.parse(data);

      // Find the index position of the product to update
      const productIndex = info.findIndex(product => product.id === id);

      // If product index id valid
      if (productIndex !== -1) {
        // To update only allowed fields
        for (const key in field) {
          if (validFields.includes(key)) {
            info[productIndex][key] = field[key]
          }
        }

        // After to update the field => transform the object in json string
        await fs.promises.writeFile(this.path, JSON.stringify(info, null, 2), encoding);
        console.log(`The product with 'id:${id}' has been modified!`)

      } else {
        throw new Error('Product not found!')
      }
    } catch (error) {
      console.log(`Error sale por aca: ${error.message}`);
    }
  }










  //? Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo

}


// 
const manager = new ProductManager('./productManager.json');

//

const test = async () => {
  // 1
  await manager.getProducts()

  // 2
  await manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'CCBB', 25);

  await manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'AABB', 25);

  await manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'FFBB', 25);

  // 3
  await manager.getProducts()

  // 4
  await manager.getProductById(2)

  // 5
  await manager.updateProduct(3, { tite: "AAAA" })

}

test()




/* Testing
Se creará una instancia de la clase “ProductManager”
Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
*/