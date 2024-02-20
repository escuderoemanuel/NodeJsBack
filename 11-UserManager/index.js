const UserManager = require('./UserManager');



const creatingAndFetching = async () => {
  const manager = await new UserManager();
  await manager.createUser({ Name: 'John', Lastname: 'Doe', Age: 30, Course: 'Backend Development' });
  await manager.createUser({ Name: 'Saul', Lastname: 'Hudson', Age: 58, Course: 'Backend Development' });
  await manager.createUser({ Name: 'Rachel', Lastname: 'McAdams', Age: 45, Course: 'Backend Development' });

  const users = await manager.getUsers();
}

creatingAndFetching();

