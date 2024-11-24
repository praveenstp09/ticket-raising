const express = require('express')
const generateTicket = require('../controller/generateTickets.js')
const getAllTickets = require('../controller/getAllTickets.js')

const route = express.Router()

route.get('/',(req,res)=>{
    res.json({message:'hello'})
})

route.post('/generateTicket', generateTicket)
route.get('/tickets', getAllTickets)


module.exports = route