import axios from 'axios'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

const login = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => { 
      axios.post (`${process.env.USER_SERVICE_URL}/api/users/${username}/authenticate`, {
        password: password
      })
        .then(response => {
          if (response.data && !response.data.authenticated) {
            console.log('Invalid Password');
            return done(null, false, { message: 'Invalid Password' });
          }
          return done(null, { username: username });
        })
        .catch(error => {
          console.log(`User Not Found with username '${username}'`);
          console.log(error)
          return done(null, false, { message: `User Not Found with username '${username}'` });                 
        })
    })
  )
}

const init = passport => {
  passport.serializeUser((user, done) => {
    done(null, user)
  });
        
  passport.deserializeUser((user, done) => {
    done(null, user)
  });

  // Set up strategies for login and register
  login(passport)
}

export default init 