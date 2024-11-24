const Ticket = require('../models/ticket.js')

const getTicket = async(req,res)=>{
    try{
        const ticketId = req.params.id
        const ticket = await Ticket.findById(ticketId)
        res.json(ticket)
    }catch(err){
        console.log(err)
    }
}

module.exports = getTicket