const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../passport");
const {listarAll,deleteUser,updateUser,getUser,createUser} = require('../mongoDB/utils');

router.get("/", isAuthenticated, (req, res) => {
  listarAll().then(function (result) {
    res.render("home", { result });
  });
});
router.get("/successupdate", isAuthenticated, (req, res) => {
    res.render("successUpdate");
});

router.get("/user/:username", isAuthenticated, (req, res) => {
  getUser(req.params.username).then(function (user) {
    res.render("homeUpdateUser", { user });
  });
});
router.delete("/user/:username",isAuthenticated ,(req, res) => {
  deleteUser(req.params.username).then( function (result) {
      res.render("home")
  })
})
router.put("/user/:username",isAuthenticated,(req, res) => {
  updateUser(req.body.username,req.body.newUsername,req.body.password,req.body.ip).then( function (result) {
      res.send(result)
  })
})
module.exports = router;
