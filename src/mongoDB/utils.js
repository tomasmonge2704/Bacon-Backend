const { User } = require("./userSchema");
const {createHash} = require("../bcrypt")
async function createUser(user) {
  try {
    User.create(user, (err, userWithId) => {
      if (err) {
        console.log("Error in Saving user: " + err);
        return err;
      }
      return userWithId;
    });
  } catch (error) {
    return undefined;
  }
}

async function listarAll() {
  try {
    return await User.find({}).lean();
  } catch (error) {
    return undefined;
  }
}
async function getUser(username) {
    try {
      return await User.findOne({username:username}).lean();
    } catch (error) {
      return undefined;
    }
  }
async function getUserRelacionado(req) {
    try {
        const user = await User.findOne({ username: req.params.username }).exec();
        const buscado = user.users.find( e  => e.username == req.params.userId)
        const data = {
            key: user.key,
            cert: user.cert,
            username:buscado.username,
            password:buscado.password,
            ip:buscado.ip
        }
      return  data
    } catch (error) {
      return undefined;
    }
  }
async function deleteUser (username){
    try {
          return await User.deleteOne({ username: username });
      } catch (error) {
        return undefined;
      }
}
async function updateUser (req){
    try {
        const user = await User.findOne({ username: req.username }).exec();
        user.username = req.newUsername;
        user.password = createHash(req.password);
        user.cert = req.cert;
        user.key = req.key;
          return await User.updateOne(
            { _id: user._id },
            { $set: user }
          );
      } catch (error) {
        return error;
      }
}
async function updateUserRelacionado (req){
    try {
        const user = await User.findOne({ username: req.params.username }).exec();
        const buscado = user.users.find( e  => e.username == req.params.userId)
        buscado.username = req.body.username;
        buscado.password = req.body.password;
        buscado.ip = req.body.ip;
        return await User.updateOne(
            { _id: user._id },
            { $set: user }
          );
      } catch (error) {
        return error;
      }
}
async function addUserRelacionado (req){
    try {
        const user = await User.findOne({ username: req.params.username }).exec();
        if(user.users.length == 0 ){
            user.users = [{username:req.body.username,password:req.body.password,ip:req.body.ip}]
        }else{
            const newUser = {
                username:req.body.username,
                password:req.body.password,
                ip:req.body.ip
            }
            user.users.push(newUser)
        }
          return await User.updateOne(
            { _id: user._id },
            { $set: user }
          );
      } catch (error) {
        return error;
      }
}
module.exports = { getUserRelacionado,listarAll,createUser,updateUser,deleteUser,getUser,addUserRelacionado,updateUserRelacionado };
