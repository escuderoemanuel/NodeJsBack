class ProductsDao {

  static id = 0;
  constructor() {
    this.products = []
  }

  async create(product) {
    product.id = ++ProductsDao.id;
    this.products.push(product);
    return product;
  }

  async getAll() {
    return this.products;
  }

  async getById(id) {
    return this.products.find(product => product.id == id);
  }

  async update(pid, product) {
    const index = this.products.findIndex(product => product.id == pid);
    this.products[index] = product;
    return this.products[index];
  }

  async delete(pid) {
    const index = this.products.findIndex(product => product.id == pid);
    this.products.splice(index, 1);
    return this.products;
  }

}

module.exports = ProductsDao;
