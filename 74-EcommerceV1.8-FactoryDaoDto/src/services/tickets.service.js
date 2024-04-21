class TicketsService {

  constructor(dao) {
    this.dao = dao;
  }

  async getAll(queryParams = null) {
    return await this.dao.getAll(queryParams);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

}

module.exports = TicketsService;