const mongoose = require('mongoose');
const { MONGO_URL, PERSISTENCE } = require('../config/environment.config');

let ProductsDao;
let UsersDao;
let TicketsDao;
let CartsDao;

switch (PERSISTENCE) {
  case 'MONGO':
    mongoose.connect(MONGO_URL).then(() => {
      console.log('Connected to MongoDB')
    })
    ProductsDao = require('../dao/managers/products.dao')
    UsersDao = require('../dao/managers/users.dao')
    TicketsDao = require('../dao/managers/tickets.dao')
    CartsDao = require('../dao/managers/carts.dao')
    break;

  case 'MEMORY':
    console.log('Conntected to MEMORY')
    ProductsDao = require('../dao/memory/products.memory')
    UsersDao = require('../dao/memory/users.memory')
    TicketsDao = require('../dao/memory/tickets.memory')
    CartsDao = require('../dao/memory/carts.memory')
    break;
}

module.exports = {
  CartsDao,
  ProductsDao,
  UsersDao,
  TicketsDao
};