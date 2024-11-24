const express = require('express')
const generateTicket = require('../controller/generateTickets.js')

const route = express.Router()

route.get('/',(req,res)=>{
    res.json({message:'hello'})
})
route.post('/generateTicket', generateTicket)
module.exports = route