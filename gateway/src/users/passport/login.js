const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios')
const userService = `http://${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_HP}`

module.exports = passport => {
  passport.use('login',
    new LocalStrategy({
      passReqToCallback : true
    },
    (username, password, done) => { 
      axios.get (`${userService}/api/users/${username}`)
        .then(response => {
          if (response.body.user.password !== password) {
            console.log('Invalid Password');
            return done(null, false, { message: 'Invalid Password' });
          }
          return done(null, user);
        })
        .catch(error => {
          console.log(`User Not Found with username '${username}'`);
          console.log(error)
          return done(null, false, { message: `User Not Found with username '${username}'` });                 
        })
    })
  )
}