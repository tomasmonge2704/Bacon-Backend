const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../passport");
const {getUserRelacionado,deleteUser,updateUser,getUser,updateUserRelacionado,addUserRelacionado} = require('../mongoDB/utils');


router.get("/:username", isAuthenticated, (req, res) => {
    getUser(req.params.username).then(function (user) {
      res.render("perfilUser", { user });
    });
  });
router.get("/:username/users/:userId", isAuthenticated, (req, res) => {
    getUserRelacionado(req).then(function (user) {
      res.send(user);
    });
  });
  router.get("/:username/actualizar", isAuthenticated, (req, res) => {
    getUser(req.params.username).then(function (user) {
      res.render("homeUpdateUser", { user });
    });
  });
  router.delete("/:username",isAuthenticated ,(req, res) => {
    deleteUser(req.params.username).then( function (result) {
        res.render("home")
    })
  })
  router.put("/:username",isAuthenticated,(req, res) => {
    updateUser(req.body).then( function (result) {
        res.send(result)
    })
  })
  router.put("/:username/users/:userId",isAuthenticated,(req, res) => {
    updateUserRelacionado(req).then( function (result) {
        res.send(result)
    })
  })
  router.post("/:username/users",isAuthenticated,(req, res) => {
    addUserRelacionado(req).then( function (result) {
        res.send(result)
    })
  })

module.exports = router;
