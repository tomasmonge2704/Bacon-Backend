const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    key:Buffer,
    cert:Buffer,
    users:[
      {username:String,
       password:String,
       ip:String
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });

const User = mongoose.model('usuarios-Bacon', userSchema);

module.exports = {User};