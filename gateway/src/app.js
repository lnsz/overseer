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
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

// const login = () => {
//   passport.authenticate('local', (error, user, info) => {
//     console.log(user)
//     console.log(info)
//     if (error) {
//       console.log(error)
//       res.status(500).send(error)
//       return
//     }
//     res.send({ success: true })
//   })(req.body.username, req.body.password)
// }

const logout = (req, res) => {
  req.logout()
  res.send({ success: true })
}

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
app.post('/logout', logout)

app.use('/api', require('./dashboards/router'))
app.use('/api', require('./tiles/router'))
app.use('/api', require('./users/router'))

app.listen(process.env.PORT || 8000)