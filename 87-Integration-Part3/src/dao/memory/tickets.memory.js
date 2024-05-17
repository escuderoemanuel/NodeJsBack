class TicketsDao {

  static id = 0;
  constructor() {
    this.tickets = []
  }

  async getAll() {
    return await this.tickets;
  }

  async getById(tid) {
    return await this.tickets.find(ticket => ticket.id === tid);
  }

  async create(ticket) {
    ticket.id = ++TicketsDao.id;
    this.tickets.push(ticket);
    return ticket;
  }

  async update(tid, ticket) {
    const index = this.tickets.findIndex(ticket => ticket.id === tid);
    this.tickets[index] = ticket;
    return ticket;
  }

  async delete(tid) {
    const index = this.tickets.findIndex(ticket => ticket.id === tid);
    this.tickets.splice(index, 1);
    return this.tickets;
  }

}

module.exports = TicketsDao;