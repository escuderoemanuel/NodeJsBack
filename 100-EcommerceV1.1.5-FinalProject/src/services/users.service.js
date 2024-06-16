const MailingsService = require('../services/mailings.service');
const mailingsService = new MailingsService();

class UsersService {
  constructor(dao) {
    this.dao = dao;
  }

  async create(user) {
    return await this.dao.create(user);
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(uid) {
    return await this.dao.getById(uid);
  }

  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async getByProperty(property, value) {
    const item = await this.dao.getByProperty(property, value);
    if (!item) throw { message: `There's no item by ${property} = ${value}`, status: 400 };
    return item;
  }

  async update(uid, user) {
    const result = await this.dao.update(uid, user);
    if (result.nModified === 0) {
      throw new Error(`Failed to update user with id ${uid}`);
    }
    return result;
  }

  async delete(uid) {
    return await this.dao.delete(uid);
  }

  async setLastConnection(uid) {
    const user = await this.getById(uid);
    if (!user) {
      throw new Error(`User with id ${uid} not found`);
    }
    return await this.update(uid, { lastConnection: new Date() });
  }

  async addDocuments(uid, files) {
    const user = await this.getById(uid);
    let documents = user.documents || [];

    documents = [
      ...documents,
      ...files.map(file => ({
        name: file.originalname,
        reference: file.path.split('public')[1].replace(/\\/g, '/')
      }))
    ];

    return await this.update(uid, { documents });
  }

  async changeRole(uid) {
    const user = await this.getById(uid);
    return await this.update(uid, { role: user.role });
  }

  async deleteInactiveUsers() {
    const users = await this.getAll();
    const inactiveUsers = users.filter(user => user.lastConnection < new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)); // 2 days
    // const inactiveUsers = users.filter(user => user.lastConnection < new Date(Date.now() - 30 * 60 * 1000)); // 30 minutes

    for (const user of inactiveUsers) {
      await mailingsService.sendDeletedInactiveUserEmail(user.email)
      await this.delete(user._id);
    }

    const updatedUsers = await this.getAll();
    return updatedUsers;
  }
}

module.exports = UsersService;
