const fs = require('fs');
const encoding = 'utf-8'

class ProductManager {
  constructor(path) {
    this.path = path;
    // aqui necesito inicializar el id
    this.createFile()
  }

  createFile() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '[]', encoding)
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  // getProducts
  getProducts() {
    let info = {}

    try {
      if (fs.existsSync(this.path)) {
        info = fs.readFileSync(this.path, encoding)
        this.products = JSON.parse(info)
      } else {
        fs.writeFileSync(this.path, '[]', encoding)
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
    return this.products;
  }


  addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const product = {
        id: //aqui quiero que el id se incremente siempre en 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      const data = fs.readFileSync(this.path, encoding)
      const info = JSON.parse(data)

      if (info.find(prod => prod.code === product.code)) {
        console.log('El producto ya existe')
      } else {
        info.push(product)
        fs.writeFileSync(this.path, JSON.stringify(info, null, 2), encoding)
      }
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
    return this.products;

  }
}

const manager = new ProductManager('./products.json');
//console.log(manager.getProducts())

manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'BBBB', 25);
manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

//console.log(manager.getProducts())

//manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'AAA333', 25);

//console.log(manager.getProducts())
