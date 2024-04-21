const BusinessModel = require('../models/users.models');

class BusinessDAO {

  async getAll() {
    return await BusinessModel.find({});
  }

  async getById(id) {
    return await BusinessModel.findById(id);
    // return await UsersModel.findOne({_id:id});
  }

  async create(user) {
    return await BusinessModel.create(user);
  }

  async update(id, user) {
    return await BusinessModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await BusinessModel.deleteOne({ _id: id });
  }
}

module.exports = BusinessDAO;