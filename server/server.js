const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./database/connection')

const app = express()

const PORT = 3002
dotenv.config({path: '.env'})

app.use(morgan('tiny'))
app.use(cors())

connectDB()

app.use(express.json())
app.use('/', require('./routes/router'))
app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'ok'
    })
})

app.listen(3002, () => {
    console.log(`Server actually running on port http://localhost:${PORT}`)
})