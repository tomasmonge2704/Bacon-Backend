const { User } = require("./userSchema");
const {createHash} = require("../bcrypt")
async function createUser(username, password, ip) {
  const newUser = {
    username: username,
    password: createHash(password),
    ip: ip,
  };
  try {
    User.create(newUser, (err, userWithId) => {
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
async function deleteUser (username){
    try {
          return await User.deleteOne({ username: username });
      } catch (error) {
        return undefined;
      }
}
async function updateUser (username,newUsername,password,ip){
    try {
        const user = await User.findOne({ username: username }).exec();
        user.username = newUsername
        user.password = createHash(password)
        user.ip = ip;
          return await User.updateOne(
            { _id: user._id },
            { $set: user }
          );
      } catch (error) {
        return error;
      }
}
module.exports = { listarAll,createUser,updateUser,deleteUser,getUser };
