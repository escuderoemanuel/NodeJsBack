const { Contacts, Products } = require('../dao/factory')
const ContactsRepository = require('./contacts.repository')
const ProductsRepository = require('./products.repository')

const contactsService = new ContactsRepository(new Contacts())
const productsService = new ProductsRepository(new Products())

module.exports = {
  contactsService,
  productsService
}