// fs will allow us to access operations for files
const fs = require('fs');
const encoding = 'utf-8';

//* Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  //* Debe tener un método 'getProducts', el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
  async getProducts() {

    try {
      // Verify if the file exists.
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding)
      }

      // Read the file, parse the data and save the data in the object.
      const data = await fs.promises.readFile(this.path, encoding)
      this.products = await JSON.parse(data)
      console.log('All products found:\n', this.products)
      return this.products;

    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }

  //* Debe guardar objetos con el siguiente formato: id, title, description, price, thumnail, code, stock
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding)
      }

      // Read the file, parse the data and save the data in the const parsedData.
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = await JSON.parse(data);

      // Verify if all the fields are filled.
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        throw new Error('All fields are required');
      }

      // Verify if the product code already exists.
      if (parsedData.find(prod => prod.code === code)) {
        throw new Error('The product code already exists.');
      } else {
        // If the product code does not exist, decleare the id variable, check the number of existing ids and add 1 to the last one and assign it to the new product
        const id = parsedData.length > 0 ? parsedData[parsedData.length - 1].id + 1 : 1;
        const product = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
        };
        // Add the new product to the products array.
        parsedData.push(product);

        // Save the updated data in the file.
        await fs.promises.writeFile(this.path, JSON.stringify(parsedData, null, 2), encoding);
        console.info('Product added successfully!');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  //* Debe tener un método 'getProductById', el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
  async getProductById(id) {
    try {
      // Read the file, parse the data and save the data in the const parsedData.
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = await JSON.parse(data);

      // Find the product with the specified id.
      const product = parsedData.find(product => product.id === id);

      if (product) {
        console.log(`Product with id:${id} found:\n`, product);
        return product;
      } else {
        console.log(`Product with id:${id} not found.`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  //* Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
  async updateProduct(id, field) {
    try {
      // Array of fields that can be modified. (Without this validation you could add new fields)
      const validFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

      // Verify if the field is valid
      if (typeof field !== 'object' || Object.keys(field).length === 0 || !Object.keys(field).some(key => validFields.includes(key))) {
        throw new Error('The product cannot be modified. Invalid field.');
      }

      // Read the file, parse the data and save the data in the const parsedData.
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = await JSON.parse(data);

      // Find the index position of the product to update
      const productIndex = parsedData.findIndex(product => product.id === id);

      // If product index id valid
      if (productIndex !== -1) {
        // Itarates in search of the index of the field to update
        for (const key in field) {
          if (validFields.includes(key)) {
            parsedData[productIndex][key] = field[key]
          }
        }

        // After to update the field => transform the object in json string
        await fs.promises.writeFile(this.path, JSON.stringify(parsedData, null, 2), encoding);
        console.log(`The product with 'id:${id}' has been modified successfully!`)

      } else {
        throw new Error(`Product with id${id} not found.`)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }


  //* Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo
  async deleteProduct(id) {
    try {
      // Read the file, parse the data and save the data in the const parsedData.
      const data = await fs.promises.readFile(this.path, encoding);
      const parsedData = await JSON.parse(data);

      // Find the index position of the product to delete. If the product is not found, it will return -1.
      const productIndex = parsedData.findIndex(product => product.id === id);

      if (productIndex !== -1) {
        // Delete 1 product, from the specified productIndex
        parsedData.splice(productIndex, 1);
        // After to delete the product => transform the object in json string.
        await fs.promises.writeFile(this.path, JSON.stringify(parsedData, null, 2), encoding);
        console.log(`The product with id:${id} has been deleted successfully!`)
      } else {
        throw new Error(`Product to delete with id:${id} not found!`)
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

//! Detalle del proceso de testing!
// Create an async test function because ProductManager class works with promises
const test = async () => {
  console.log('\nSe creará una instancia de la clase “ProductManager”, lo que creará automáticamente un archivo json con el nombre especificado en la ruta especificada.')
  const manager = new ProductManager('./productManager.json');

  console.log('\nSe llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío.')
  await manager.getProducts()

  console.log('\nSe llamará al método “addProduct” con campos incompletos para forzar un error: {price:200, thumbnail:”Sin imagen”, code:”abc123”, stock:25}')
  await manager.addProduct(200, 'Sin imagen', 'abc123', 25);

  console.log('\nSe llamará al método “addProduct” con los campos correctos => El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.')
  await manager.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

  console.log('\nSe llamará al método “addProduct” con el code repetido para forzar error.')
  await manager.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

  console.log('\nSe llamará al método “addProduct” con campos correctos nuevamente para chequear el funcionamiento de asignación de id incrementales => El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.')
  await manager.addProduct('producto prueba2', 'Este es un producto de prueba2', 200, 'Sin imagen', 'abc124', 25);

  console.log('\nSe llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado.')
  await manager.getProducts()

  console.log('\nSe llamará al método “getProductById” con un id incorrecto para forzar un error.')
  await manager.getProductById(4)

  console.log('\nSe llamará al método “getProductById” con un id válido, lo cual debe retornar el producto correcto.')
  await manager.getProductById(1)

  console.log('\nSe llamará al método “updateProduct” y se intentará cambiar un campo incorrecto de algún producto para forzar un error.')
  await manager.updateProduct(3, { invalidFieldTest: 'Título del producto actualizado' })

  console.log('\nSe llamará al método “updateProduct” y se intentará cambiar un campo correcto de algún producto con id incorrecto para forzar un error.')
  await manager.updateProduct(3, { title: 'Título del producto actualizado' })

  console.log('\nSe llamará al método “updateProduct” y se intentará cambiar un campo correcto de algún producto con id correcto. Se evaluará que no se elimine el id y que sí se haya hecho la actualización.')
  await manager.updateProduct(1, { title: 'Título del producto actualizado' })

  console.log('\nSe llamará “getProducts” nuevamente, para chequear que el title del producto haya sido actualizado.')
  await manager.getProducts()

  console.log('\nSe llamará al método “deleteProduct” con un id incorrecto para forzar un error.')
  await manager.deleteProduct(5)

  console.log('\nSe llamará al método “deleteProduct” con un id correcto. Se evaluará que realmente se elimine el producto.')
  await manager.deleteProduct(1)

  console.log('\nSe llamará “getProducts” nuevamente, para chequear que el producto haya sido eliminado. Debe devolver el arreglo con 1 solo producto.')
  await manager.getProducts()
}

//! Uncomment next line to execute test function
//test()