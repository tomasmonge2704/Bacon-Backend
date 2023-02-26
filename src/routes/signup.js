const express = require('express');
const router = express.Router();
const {passport,isAuthenticated} = require('../passport')

router.get('/',isAuthenticated, (req, res) => {
    res.render('signup');
});
router.get('/fail', (req, res) => {
    res.render('failsignup');
});

router.post('/',isAuthenticated, passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup/fail'
}));

module.exports = router;