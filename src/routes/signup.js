const express = require('express');
const router = express.Router();
const {passport} = require('../passport')

router.get('/', (req, res) => {
    res.render('signup');
});
router.get('/fail', (req, res) => {
    res.render('failsignup');
});

router.post('/', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup/fail'
}));

module.exports = router;