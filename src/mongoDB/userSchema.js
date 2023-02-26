const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
  });

const User = mongoose.model('usuarios-Bacon', userSchema);

async function listarAll (){
    try {
          return await User.find({}).lean();
      } catch (error) {
        return undefined;
      }
}
module.exports = {User,listarAll}