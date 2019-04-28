import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './router.mjs'
import { loadModules } from './utils/modules.mjs'

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

app.use('/api', router)

loadModules()

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})