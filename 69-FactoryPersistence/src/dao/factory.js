const { PERSISTENCE } = require('../config/config');
const { MONGO_URL } = require('../config/config');
const mongoose = require('mongoose');


switch (PERSISTENCE) {
  case 'MONGO':
    mongoose.connect(MONGO_URL).then(() => {
      console.log("Atlas MongoDB Connected");
    });
    Contacts = require('./mongoDB/contacts.mongo.js')
    break;
  case 'MEMORY':
    console.log("Memory DB Conected");
    Contacts = require('./memory/contacts.memory.js')
    break;
}

module.exports = {
  Contacts
};