const mongoose = require('mongoose');
const { PERSISTENCE, MONGO_URL } = require('../config/environment.config');

let CartsDao;
let ProductsDao;
let UsersDao;
let TicketsDao;


switch (PERSISTENCE) {

  case 'MONGO':
    mongoose.connect(MONGO_URL).then(() => {
      console.log('Connected to MongoDB FACTORY');
    });
    CartsDao = require('./managers/carts.dao');
    ProductsDao = require('./managers/products.dao');
    UsersDao = require('./managers/users.dao');
    TicketsDao = require('./managers/tickets.dao');
    break;

  case 'MEMORY':
    CartsDao = require('./memory/carts.memory');
    ProductsDao = require('./memory/products.dao');
    UsersDao = require('./memory/users.memory');
    TicketsDao = require('./memory/tickets.memory');
    break;

}

module.exports = {
  CartsDao,
  ProductsDao,
  UsersDao,
  TicketsDao
};