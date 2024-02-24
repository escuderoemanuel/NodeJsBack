const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

// collection 'messages' + schema
const MessagesModel = mongoose.model('messages', messagesSchema);
module.exports = MessagesModel;