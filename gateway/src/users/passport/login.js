const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios')
const userService = `http://${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_HP}`

module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => { 
      axios.get (`${userService}/api/users/${username}`)
        .then(response => {
          console.log(response.data)
          if (response.data.password !== password) {
            console.log('Invalid Password');
            return done(null, false, { message: 'Invalid Password' });
          }
          return done(null, response.data);
        })
        .catch(error => {
          console.log(`User Not Found with username '${username}'`);
          console.log(error)
          return done(null, false, { message: `User Not Found with username '${username}'` });                 
        })
    })
  )
}