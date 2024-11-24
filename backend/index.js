const express = require('express')
const route = require('./routes/routes.js')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use('/', route)

mongoose.connect('mongodb+srv://bhaveshgautam2302:0dZwo2G1cPIpWxu3@cluster0.lsc3j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connected to database')
}).catch((err)=>{
    console.log(err)
})

app.listen(8000, ()=>{
    console.log('server is running on port:8000')
})