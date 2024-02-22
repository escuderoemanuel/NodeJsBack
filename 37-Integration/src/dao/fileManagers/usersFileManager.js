const fs = require('fs')
const filePath = `${__dirname}/files/users.json`
const encoding = 'utf-8'

class Users {

  static id = 0;

  constructor() {
    console.log('New users instance...')
    this.users = [];
  }

  async getAll() {
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, encoding);
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  async saveUser(user) {
    user.id = ++Users.id;
    let users = await this.getAll();

    users.push(user);
    await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
  }
}


module.exports = Users;