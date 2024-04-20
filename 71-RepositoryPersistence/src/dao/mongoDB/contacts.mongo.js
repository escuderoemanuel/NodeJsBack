const contactsModel = require('./models/contacts.model');

class Contacts {

  async getAll() {
    return await contactsModel.find({});
  }

  async getById(id) {
    return await contactsModel.findById(id);
    //return await contactsModel.findOne({ _id: id })
  }

  async create(contact) {
    return await contactsModel.create(contact);
  }

  async update(id, contact) {
    return await contactsModel.findByIdAndUpdate(id, contact, { new: true });
    //return await contactsModel.updateOne({_id:id}, contact)
  }

  async delete(id) {
    return await contactsModel.deleteOne({ _id: id });
    //return await contactsModel.findByIdAndDelete(id)
  }
}

module.exports = Contacts;