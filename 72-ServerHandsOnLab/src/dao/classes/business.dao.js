const BusinessModel = require('../models/business.model');

class BusinessDAO {

  async getAll() {
    return await BusinessModel.find({});
  }

  async getById(id) {
    const business = await BusinessModel.findById(id);
    if (!business) {
      throw { status: 400, message: 'Business not found' };
    }
    return business;
    // return await BusinessModel.findOne({_id:id});
  }

  async create(user) {
    return await BusinessModel.create(user);
  }

  async update(id, user) {
    await this.getById(id);
    return await BusinessModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await BusinessModel.deleteOne({ _id: id });
  }
}

module.exports = BusinessDAO;