class Contacts {
  static id = 0

  constructor() {
    this.contacts = [];
  }

  getAll() {
    return this.contacts;
  }

  getById(id) {
    return this.contacts.find(contact => contact.id == id);
  }

  create(contact) {
    contact.id = ++Contacts.id;
    this.contacts.push(contact);
    return contact
  }


  update(id, contact) {
    const index = this.contacts.findIndex(contact => contact.id === id);
    this.contacts[index] = { ...this.contacts[index], ...contact };
    return this.contacts[index];
  }

  delete(id) {
    const index = this.contacts.findIndex(contact => contact.id === id);
    return this.contacts.splice(index, 1);
    // const deleted =  this.contacts.splice(index, 1);
    // return deleted;

  }

}

module.exports = Contacts
