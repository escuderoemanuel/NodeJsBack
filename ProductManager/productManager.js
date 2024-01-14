//! Consigna

//? Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1). 

//! Aspectos a incluir

//? La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//? Debe guardar objetos con el siguiente formato:
//? - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//? - title (nombre del producto)
//? - description (descripción del producto)
//? - price (precio)
//? - thumbnail (ruta de imagen)
//? - code (código identificador)
//? - stock (número de piezas disponibles)

//? Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//? Debe tener un método 'getProducts', el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//? Debe tener un método 'getProductById', el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//? Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
//? Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo

//! Archivo de javascript con el nombre ProductManager.js


//const fs = require('fs').promises;
const fs = require('fs');
const encoding = 'utf-8'


class ProductManager {

  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.id = 1;
  }

  async getProducts() {
    let info = {}
    try {
      if (!fs.existsSync(this.path)) {
        //throw new Error('File not found');
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log('Created file')
      }
      const data = await fs.readFile(this.path, encoding);
      info = JSON.parse(data);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

const manager = new ProductManager('./products.json');
manager.getProducts();

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