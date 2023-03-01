const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./mongoDB/userSchema');
const {isValidPassword,createHash} = require('./bcrypt')

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
//singup
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(req.body.ip)
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
          cert:req.body.cert,
          key:req.body.key,
          users:req.body.users
        };
        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
module.exports = {passport,isAuthenticated};