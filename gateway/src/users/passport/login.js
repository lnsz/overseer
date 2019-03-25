const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios')

module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => { 
      axios.get (`${process.env.USER_SERVICE_URL}/api/users/${username}`)
        .then(response => {
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