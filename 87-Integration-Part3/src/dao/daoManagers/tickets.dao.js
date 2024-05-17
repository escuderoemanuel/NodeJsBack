const TicketModel = require("../models/tickets.model")

class TicketsDao {

  async getAll() {
    return await TicketModel.find().lean()
  }

  async getById(tid) {
    return await TicketModel.findOne({ _id: tid }).populate('items.item').lean()
  }

  async create(item) {
    return await TicketModel.create(item)
  }

  async update(tid, item) {
    return await TicketModel.updateOne({ _id: tid }, item)
  }

  async delete(tid) {
    return await TicketModel.deleteOne({ _id: tid })
  }
}

module.exports = TicketsDao;