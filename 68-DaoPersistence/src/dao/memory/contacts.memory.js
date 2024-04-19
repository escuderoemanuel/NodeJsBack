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

  async getAll() {
    return this.contacts;
  }
}

module.exports = Contacts
