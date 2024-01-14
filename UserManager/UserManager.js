const fs = require('fs')
const encoding = 'utf-8'
const file = './users.json'

class UserManager {

  constructor() {
    this.users = []
  }

  async createUser(object) {
    this.users.push(object);
    try {

      await fs.promises.writeFile(file, JSON.stringify(this.users));
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  async getUsers() {
    try {
      const data = await fs.promises.readFile(file, encoding);
      this.users = JSON.parse(data);
      return this.users;
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
}

module.exports = UserManager;