const UserManager = require('./UserManager');

const manager = new UserManager();


const login = async () => {
  const user1 = {
    username: 'JohnDoe14',
    password: '123456',
  }

  const user2 = {
    username: 'JaneDoe69',
    password: '654321',
  }

  const user3 = {
    username: 'SaulHudson',
    password: 'slash',
  }

  await manager.createUser(user1);
  await manager.createUser(user2);
  await manager.createUser(user3);

  await manager.validateUser('SaulHudson', 'slash')
}

login();