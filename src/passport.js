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
      console.log(req.files)
      // revisa si existe algun usuario que ya tenga ese username
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }
        if (user) {
          return done('el usuario ya se encuentra registrado.');
        }
        try {
          // Obtener los archivos y los datos JSON de la solicitud
          let cert;
          let key;
          if(req.files) cert = req.files['cert'][0].buffer;
          if(req.files) key = req.files['key'][0].buffer;
          const newUser = {
            username: username,
            password: createHash(password),
            cert:cert,
            key:key,
            users:req.body.users
          };
      
          // Crear una nueva instancia de Upload y guardarla en la base de datos
          const user = new User(newUser);
          await user.save();
          // Enviar una respuesta con un mensaje
          return done(null);
        } catch (error) {
          console.error('Error al cargar los archivos', error);
          return done(error);
        }
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