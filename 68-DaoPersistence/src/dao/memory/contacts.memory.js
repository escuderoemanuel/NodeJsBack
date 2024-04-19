class Contacts {
  constructor() {
    this.contacts = [{
      firstName: 'John',
      lastName: 'Memory',
      email: 'john@gmail.com'
    }, {
      firstName: 'Jane',
      lastName: 'Memory',
      email: 'jane@gmail.com'
    }];
  }

  getAll() {
    return this.contacts;
  }

  getById(id) {
    return this.contacts.find(contact => contact.id === id);
  }

  create(contact) {
    this.contacts.push(contact);
  }

  update(id, contact) {
    this.contacts[id] = contact;
  }

  delete(id) {
    this.contacts.splice(id, 1);
  }

}

module.exports = Contacts
