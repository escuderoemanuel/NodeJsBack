const UserModel = require('../../models/user.model');

class UsersManager {
  constructor() {
    console.log('new intance of db...')
  }

  async getAll() {
    let users = await UserModel.find().lean(); // lean() transforma cada documento en objeto js
    return users;
  }

  async saveUser(user) {
    let result = await UserModel.create(user);
    return result;
  }
}

module.exports = UsersManager;