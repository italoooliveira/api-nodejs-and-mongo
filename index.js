const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes)

app.get('/', (request, response) => {
    response.json({message: "Oi express"})
})

mongoose
    .connect('mongodb+srv://user:password@restfulapibanco.lq7ds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(() => {
            app.listen(3000)
        })
        .catch((error) => {
            console.log(error)
        })
