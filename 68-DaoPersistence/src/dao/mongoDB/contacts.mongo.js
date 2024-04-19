const contactsModel = require('./models/contacts.model');

class Contacts {
  async getAll() {
    return await contactsModel.find({})
  }
}
module.exports = Contacts;