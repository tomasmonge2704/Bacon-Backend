const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../passport");
const {listarAll} = require('../mongoDB/userSchema');

router.get("/", isAuthenticated, (req, res) => {
  listarAll().then(function (result) {
    res.render("home", { result });
  });
});

module.exports = router;
