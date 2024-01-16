const crypto = require('crypto');
const fs = require('fs');


const path = './Users.js';
const encoding = 'utf-8';
const secret = 'abc123';

class UserManager {

  async getUsers() {
    if (!fs.existsSync(path)) {
      await fs.promises.writeFile(path, '[]')
    }

    const data = await fs.promises.readFile(path, encoding)
    const users = JSON.parse(data)

    return users;
  }

  async createUser(user) {

    const users = await this.getUsers();

    const hashedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');

    user.password = hashedPassword;

    users.push(user)

    await fs.promises.writeFile(path, JSON.stringify(users, null, 2)); // null, 2 just change format indent
    return user;
  }

  async validateUser(username, password) {

    const data = await fs.promises.readFile(path, encoding)

    const users = JSON.parse(data);

    const user = users.find(user => user.username === username)
    if (!user) {
      console.log('User found!')
      return;
    }

    const newHashedPassword = crypto.createHmac('sha256', secret).update(password).digest('hex');

    if (newHashedPassword === user.password) {
      console.log('User Logged!')
    } else {
      console.log('Invalid Password!')
    }

  }

}

module.exports = UserManager;