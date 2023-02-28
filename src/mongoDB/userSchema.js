const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    ip:String,
    password: String,
  });

const User = mongoose.model('usuarios-Bacon', userSchema);

module.exports = {User};