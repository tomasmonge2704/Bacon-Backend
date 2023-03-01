const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../passport");
const {listarAll} = require('../mongoDB/utils');

router.get("/", isAuthenticated, (req, res) => {
  listarAll().then(function (result) {
    res.render("home", { result });
  });
});
router.get("/successupdate", isAuthenticated, (req, res) => {
    res.render("successUpdate");
});


module.exports = router;
