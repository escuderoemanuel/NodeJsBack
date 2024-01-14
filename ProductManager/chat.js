const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      const newProduct = {
        id: products.length + 1,
        ...product,
      };
      products.push(newProduct);
      await this.writeToFile(products);
      console.log('Product added successfully');
    } catch (error) {
      console.log(`Error adding product: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file does not exist, return an empty array
      if (error.code === 'ENOENT') {
        console.log(products);
      }
      console.log(`Error reading file: ${error.message}`);
      console.log(products);

    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        console.log(`Product with id '${id}' found:`);
        console.log(product);
        return product;
      } else {
        console.log(`Product with id '${id}' not found`);
        return null;
      }
    } catch (error) {
      console.log(`Error getting product by id: ${error.message}`);
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct, id };
        await this.writeToFile(products);
        console.log('Product updated successfully');
        return products[productIndex];
      } else {
        console.log(`Product with id '${id}' not found`);
        return null;
      }
    } catch (error) {
      console.log(`Error updating product: ${error.message}`);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter(p => p.id !== id);
      if (updatedProducts.length < products.length) {
        await this.writeToFile(updatedProducts);
        console.log(`Product with id '${id}' deleted successfully`);
        return updatedProducts;
      } else {
        console.log(`Product with id '${id}' not found`);
        return null;
      }
    } catch (error) {
      console.log(`Error deleting product: ${error.message}`);
      return null;
    }
  }

  async writeToFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }
}

// Ejemplo de uso:
const productManager = new ProductManager('./products.json');
productManager.getProducts();
// Añadir un producto
/* const newProduct = {
  title: 'New Product',
  description: 'This is a new product',
  price: 19.99,
  thumbnail: 'path/to/image.jpg',
  code: 'ABC123',
  stock: 50,
};

productManager.addProduct(newProduct);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('All Products:', allProducts);

// Obtener un producto por ID
const productId = 1;
const productById = productManager.getProductById(productId);

// Actualizar un producto por ID
const updatedProduct = {
  title: 'Updated Product',
  description: 'This product has been updated',
  price: 24.99,
  thumbnail: 'path/to/updated-image.jpg',
  code: 'XYZ789',
  stock: 30,
};
productManager.updateProduct(productId, updatedProduct);

// Eliminar un producto por ID
productManager.deleteProduct(productId);
 */