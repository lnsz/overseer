import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import expressSession from 'express-session'
import passport from 'passport'
import setupPassport from './users/passport/setup.mjs'
import dashboardsRouter from './dashboards/router.mjs'
import tilesRouter from './tiles/router.mjs'
import usersRouter from './users/router.mjs'

const app = express()

// CORS setup to allow client to send requests
const whitelist = [
  process.env.CLIENT_URL,
  'http://localhost:4000'
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console.log(origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors())

app.use(morgan('combined'))
app.use(bodyParser.json())

// Passport (authentication)
setupPassport(passport)
app.use(expressSession({secret: 'secret'}));
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', dashboardsRouter)
app.use('/api', tilesRouter)
app.use('/api', usersRouter(passport))

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})