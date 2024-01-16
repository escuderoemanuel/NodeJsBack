const UserManager = require('./UserManager');

const manager = new UserManager();


const login = async () => {
  const user = {
    username: 'JohnDoe14',
    password: '123456',
  }

  await manager.createUser(user);

  await manager.validateUser('JohnDoe14', 'abcdef')
  await manager.validateUser('JohnDoe14', '123456')
}

login();