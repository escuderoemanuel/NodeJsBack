class MessagesDao {

  static id = 0;
  constructor() {
    this.messages = []
  }

  async init() {
    this.messages = await this.getAll();
  }

  async deleteAll() {
    this.messages = [];
    return this.messages;
  }

  async delete(id) {
    this.messages = this.messages.filter(message => message.id !== id);
    return this.messages;
  }

  async getById(id) {
    return this.messages.find(message => message.id == id);
  }

  async update(id, message) {
    const index = this.messages.findIndex(message => message.id == id);
    this.messages[index] = message;
    return this.messages[index];
  }

  async getAll() {
    return this.messages;
  }

  async create(message) {
    message.id = ++MessagesDao.id;
    this.messages.push(message);
    return message;
  }

}

module.exports = MessagesDao;