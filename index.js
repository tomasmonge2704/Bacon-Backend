const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Conexión a la base de datos de MongoDB Atlas
mongoose.connect('<URI de conexión de MongoDB Atlas>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.log('Error al conectarse a la base de datos', err);
});

//Schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  });
  
  userSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  });
  
  const User = mongoose.model('User', userSchema);

//pasport
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Email incorrecto.' }); }
      bcrypt.compare(password, user.password, function(err, res) {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Contraseña incorrecta.' });
        }
      });
    });
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
//rutas
app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('error') });
  });
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.send('Bienvenido ' + req.user.email)
    }
  })  

app.listen(port, function() {
    console.log('Servidor iniciado en el puerto ' + port);
  });