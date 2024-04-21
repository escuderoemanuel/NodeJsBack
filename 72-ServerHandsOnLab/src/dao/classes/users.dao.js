const UsersModel = require('../models/users.models');

class UsersDAO {

  async getAll() {
    return await UsersModel.find({});
  }

  async getById(id) {
    const user = await UsersModel.findById(id);
    if (!user) {
      throw { status: 400, message: 'User not found' };
    }
    return user;
    // return await UsersModel.findOne({_id:id});
  }

  async create(user) {
    // Validar si existen todas las propiedades
    return await UsersModel.create(user);
  }

  async update(id, user) {
    await this.getById(id); // Aquí está toda la lógica de validación necesaria
    return await UsersModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await UsersModel.deleteOne({ _id: id });
  }
}

module.exports = UsersDAO;