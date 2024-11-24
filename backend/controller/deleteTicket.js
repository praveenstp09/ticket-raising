const Ticket = require('../models/ticket.js')

const deleteTicket = async(req,res)=>{
    try{
        const ticketId = req.params.id
        const ticket = await Ticket.findById(ticketId)
        console.log(ticket)
        if(!ticket){
            res.json({message: "ticket does not exist"})
        }else{
            await ticket.deleteOne(ticket)
            res.json({message: "Ticket has been deleted"})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = deleteTicket