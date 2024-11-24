const Ticket = require('../models/ticket.js')

const getAllTickets = async(req,res)=>{
    try{
        const ticket = await Ticket.find()
        res.json(ticket)
    }catch(err){
        console.log(err)
        res.json({message:"Could not ticket"})
    }
}

module.exports = getAllTickets