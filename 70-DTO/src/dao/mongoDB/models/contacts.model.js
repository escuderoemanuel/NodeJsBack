const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
})

const contactsModel = mongoose.model('contacts', contactsSchema);
module.exports = contactsModel;