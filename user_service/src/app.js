const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// DB Setup
mongoose.connect(`mongodb://${process.env.DATABASE_URL}`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Connection Succeeded')
})

// Express Setup
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.use('/api', require('./router'))

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})