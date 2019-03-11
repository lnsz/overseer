const login = require('./login');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user)
  });
        
  passport.deserializeUser((user, done) => {
    user.role = user.username == 'admin' ? 'admin' : 'user'
    done(null, user)
  });

  // Set up strategies for login and register
  login(passport)
}