require("dotenv").config();
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//require cors
const cors = require('cors')
const todoListRoutes = require('./routes/api/TodoLists')
const path = require('path')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

//defining dynamic port from deployment host server
const PORT = process.env.PORT || 3000;

//database connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('✅ Database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/todoListItems', todoListRoutes)

//for deployment purpose
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

//express server
app.listen(PORT, () => console.log(`Server started - http://localhost:${PORT}`))
