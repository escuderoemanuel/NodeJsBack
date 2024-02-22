const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  }
})

// collection 'messages' + schema
const messagesModel = mongoose.model('messages', messagesSchema);
module.exports = messagesModel;