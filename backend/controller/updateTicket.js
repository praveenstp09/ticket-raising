const Ticket = require('../models/ticket.js')

const updateTicket = async(req,res)=>{
    const ticketId = req.params.id
    const ticket = Ticket.findById(ticketId)
    if(!ticket){
        res.json({message:"Ticket not found"})
    }else{
        if(req.body.title != null){
            ticket.title = req.body.title
        }
        if(req.body.description != null){
            ticket.description = req.body.description
        }
        if(req.body.createdBy != null){
            ticket.createdBy = req.body.createdBy
        }
        if(req.body.priority != null){
            ticket.priority = req.body.priority
        }
        try{
            const savedTicket = await Ticket.replaceOne({_id:ticketId}, {title: ticket.title, description: ticket.description, createdBy: ticket.createdBy, priority: ticket.priority})
            res.json(ticket)
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = updateTicket