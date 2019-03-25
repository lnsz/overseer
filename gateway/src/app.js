const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const expressSession = require('express-session');
const passport = require('passport')
require('./users/passport/init.js')(passport)

const app = express()
app.use(morgan('combined'))
app.use(expressSession({secret: 'secret'}));
app.use(bodyParser.json())

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

app.use(passport.initialize())
app.use(passport.session())

const logout = (req, res) => {
  req.logout()
  res.send({ success: true })
}

app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return res.send({ success: false, message: err }); }
    if (!user) { return res.send({ success: false, error: "Incorrect username or password"}); }
    req.logIn(user, function(err) {
      if (err) { return res.send({ success: false, error: err }); }
      return res.send({ success: true });
    });
  })(req, res, next);
});
app.post('/api/logout', logout)

app.use('/api', require('./dashboards/router'))
app.use('/api', require('./tiles/router'))
app.use('/api', require('./users/router'))

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.SERVICE_URL}`)
})