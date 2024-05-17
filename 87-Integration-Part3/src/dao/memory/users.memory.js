class UsersDao {

  static id = 0;
  constructor() {
    this.users = [{
      id: ++UsersDao.id,
      name: 'Claire',
      lastname: 'Fraser',
      age: 43,
      email: 'claire@gmail.com',
      password: '1234',
      role: 'admin'
    }];
  }

  async create(user) {
    user.id = ++UsersDao.id;
    this.users.push(user);
    console.log(user);
    return user;
  }

  async getAll() {
    return this.users;
  }

  async getById(id) {
    return this.users.find(d => d.id == id);
  }

  async getByProperty(property, value) {
    const result = this.users.find(d => value == d[property]);
    return result;
  }

  async getByEmail(email) {
    return this.users.find(d => d.email == email);
  }

  async update(id, user) {
    let index = this.users.findIndex(d => d.id == id);
    if (index < 0) {
      throw new Error('id does not exist');
    }
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async delete(id) {
    let index = this.users.findIndex(d => d.id == id);
    if (index < 0) {
      throw new Error('id does not exist');
    }
    this.users.splice(index, 1);
    return this.users;
  }
}

module.exports = UsersDao;
