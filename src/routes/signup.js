const express = require('express');
const router = express.Router();
const {passport,isAuthenticated} = require('../passport')

router.get('/',isAuthenticated, (req, res) => {
    res.render('signup');
});
router.get('/error', (req, res) => {
    res.render('error',{error:"Error en la creacion de usuario"});
});

router.post('/',isAuthenticated, passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup/error'
}));

module.exports = router;