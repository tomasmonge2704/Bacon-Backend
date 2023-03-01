const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    key:String,
    cert:String,
    users:[
      {username:String,
       password:String,
       ip:String
      }
    ]
  });

const User = mongoose.model('usuarios-Bacon', userSchema);

module.exports = {User};