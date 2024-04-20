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
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
  },
  role: {
    type: String,
  }
})

const contactsModel = mongoose.model('contacts', contactsSchema);
module.exports = contactsModel;