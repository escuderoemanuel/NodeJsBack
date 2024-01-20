const UserManager = require('./UserManager');

const manager = new UserManager();

manager.createUser({ Name: 'John', Lastname: 'Doe', Age: 30, Course: 'Backend Development' });
manager.createUser({ Name: 'Saul', Lastname: 'Hudson', Age: 58, Course: 'Backend Development' });
manager.createUser({ Name: 'Rachel', Lastname: 'McAdams', Age: 45, Course: 'Backend Development' });


manager.getUsers();