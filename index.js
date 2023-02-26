const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {passport} = require('./src/passport');
const app = express();
require('dotenv').config();
const loginRoutes = require('./src/routes/login');
const Routes = require('./src/routes/inicio');
const signupRoutes = require('./src/routes/signup');
const exphbs = require('express-handlebars')
require('./src/mongoDB/connect')
// Configuración de Express
app.use(express.static('views'))
app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: null,
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views"
}))
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use(session({
  secret: 'super-secreto',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use('/login', loginRoutes);
app.use('/', Routes);
app.use('/signup', signupRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Servidor iniciado en el puerto ' + PORT);
  });