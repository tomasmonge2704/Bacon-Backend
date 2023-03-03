// Conexión a la base de datos de MongoDB Atlas
const mongoose = require('mongoose');
const url = process.env.MongoURL

async function connectMongoDB() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectarse a MongoDB', error);
  }
}

module.exports = {
  connectMongoDB,
};