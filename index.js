const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
app.use(cors());

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes)


mongoose
    .connect('mongodb+srv://user:password@restfulapibanco.lq7ds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(() => {
            app.listen(3001)
        })
        .catch((error) => {
            console.log(error)
        })
