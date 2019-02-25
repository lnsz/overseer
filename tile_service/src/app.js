const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
const mongoose = require('mongoose')

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', (callback) => {
  console.log('Connection Succeeded')
})

app.use('/api', require('./router'))
app.listen(process.env.PORT || 8000)