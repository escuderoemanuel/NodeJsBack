const mongoose = require('mongoose');
const { persistence, mongoConnectionLink } = require('../config/config');


let ItemsDao;
let UsersDao;
let TicketsDao;
let CartsDao;

switch (persistence) {
    case 'MONGO':
        mongoose.connect(mongoConnectionLink).then(() => {
            console.log('connected to atlas.')
        })
        ItemsDao = require('./dbManagers/items.dao')
        UsersDao = require('./dbManagers/users.dao')
        TicketsDao = require('./dbManagers/tickets.dao')
        CartsDao = require('./dbManagers/carts.dao')
        break;

    case 'MEMORY':
        ItemsDao = require('./memory/items.memory')
        UsersDao = require('./memory/users.memory')
        TicketsDao = require('./memory/tickets.memory')
        CartsDao = require('./memory/carts.memory')
        break;
}

module.exports = {
    CartsDao,
    ItemsDao,
    UsersDao,
    TicketsDao
}
