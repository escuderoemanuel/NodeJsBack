class ContactsDTO {
  constructor(contact) {
    this.firstName = contact.firstName
    this.lastName = contact.lastName
    this.fullName = `${contact.firstName} ${contact.lastName}`
    this.email = contact.email
    this.active = true
    this.role = 'USER'
  }
}

module.exports = ContactsDTO; 