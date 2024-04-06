const ToysDao = require('../daos/toys.dao');

class ToysService {

  constructor() {
    this.dao = new ToysDao(); // ToysDaoMongo //ToyDaoFs
  }

  getAll() {
    return this.dao.getAll();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(toy) {
    return this.dao.create(toy);
  }

  update(id, toy) {
    const toyFound = this.dao.getById(id);
    if (!toyFound) {
      throw new Error('Toy not found')
    };
    return this.dao.update(id, toy);
  }

  delete(id) {
    const toyFound = this.dao.getById(id);
    if (!toyFound) {
      throw new Error('Toy not found')
    };
    return this.dao.delete(id);
  }

}

module.exports = ToysService;