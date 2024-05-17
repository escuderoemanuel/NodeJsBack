
class CartsDao {
  static id = 0;
  constructor() {
    this.carts = []
  }

  async create(cart) {
    cart.id = ++CartsDao.id;
    this.carts.push(cart);
    return cart;
  }

  async getAll() {
    return this.carts;
  }

  async getById(cid) {
    return this.carts.find(cart => cart.id === cid);
  }

  async delete(cid) {
    const index = this.carts.findIndex(cart => cart.id === cid);
    if (index !== -1) {
      this.carts.splice(index, 1);
    }
  }

  async update(cid, cart) {
    const index = this.carts.findIndex(cart => cart.id === cid);
    if (index !== -1) {
      this.carts[index] = cart;
    }
  }

}

module.exports = CartsDao;
