class ToysDao {
  static id = 0;

  constructor() {
    this.toys = [];
  }

  getAll() {
    return this.toys;
  }

  getById(id) {
    const toy = this.toys.find(toy => toy.id === id);
    return toy;
  }

  create(toy) {
    toy.id = ++ToysDao.id;
    this.toys.push(toy);
    return toy;
  }

  update(id, toy) {
    const index = this.toys.findIndex(toy => toy.id === id);
    this.toys[index] = { ...this.toys[index], ...toy };
    return this.toys[index];
  }

  delete(id) {
    this.toys = this.toys.filter(toy => toy.id !== id);
  }

}

module.exports = ToysDao;