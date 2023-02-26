// Conexión a la base de datos de MongoDB Atlas
const mongoose = require('mongoose');
const url = process.env.MongoURL

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch(err => {
  console.log('Error al conectarse a la base de datos', err);
});
