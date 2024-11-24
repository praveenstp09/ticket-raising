const Ticket = require('../models/ticket.js')

const generateTicket = async (req,res) =>{
    try{
        const title = req.body.title
        const description = req.body.description
        const createdBy = req.body.createdBy
        const priority = req.body.priority
        await Ticket.create({
            title,
            description,
            createdBy,
            priority
        })
        res.status(201).json({message:'ticket has been generated'})
    }catch(err){
        console.log(err)
    }
}

module.exports = generateTicket