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
const userRoutes = require('./src/routes/user');
const fileRoutes = require('./src/routes/file')

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
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
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
app.use('/user', userRoutes);
app.use('/file', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Servidor iniciado en el puerto ' + PORT);
  });