const Ticket = require('../models/ticket.js')

const generateTicket = async (req,res) =>{
    try{
        const ticket = new Ticket({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.createdBy,
            status: 'Open',
            priority: req.body.priority || 'Low',
        });
        const newTicket = await ticket.save()
        res.status(201).json(newTicket)
    }catch(err){
        console.log(err)
    }
}

module.exports = generateTicket