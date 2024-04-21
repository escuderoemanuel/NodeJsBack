const UsersModel = require('../models/users.models');

class UsersDAO {

  async getAll() {
    return await UsersModel.find({});
  }

  async getById(id) {
    return await UsersModel.findById(id);
    // return await UsersModel.findOne({_id:id});
  }

  async create(user) {
    return await UsersModel.create(user);
  }

  async update(id, user) {
    return await UsersModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await UsersModel.deleteOne({ _id: id });
  }
}

module.exports = UsersDAO;