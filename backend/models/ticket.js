const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    createdBy:{
        type: String,
        required: true,
    },
    priority:{
        type: String,
    },
    status:{
        type: String,
    }
})

const Ticket = mongoose.model("Tickets", ticketSchema)

module.exports = Ticket