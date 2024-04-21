class TicketService {
    constructor(dao){
        this.dao = dao;
    }

    async getAll(){
        return await this.dao.getAll() 
    }

    async getById(id){    
        const item = await this.dao.getById(id); 
        if(!item) throw { message:`There's no ticket by id ${id}`, status:400 }
        return item;
    }

    async create(toy){
        return await this.dao.create(toy);
    }

    async update(id, toy){
        await this.dao.getById(id);
        return await this.dao.update(id, toy);
    }

    async delete(id){
        await this.dao.getById(id);
        return await this.dao.delete(id);
    }

    async generate(email, totalAmount){
        const ticket = await this.dao.create({
            code: `${Math.random()}`, //se puede usar uuid o guid 
            purchase_datetime: new Date().toLocaleString(),
            amount: totalAmount,
            purchaser: email
        })

        return ticket; 
    }
}


module.exports = TicketService;