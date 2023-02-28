const express = require('express');
const router = express.Router();
const {passport} = require('../passport')

router.get('/', (req, res) => {
    res.render('login');
});
router.get('/fail', (req, res) => {
    res.render('loginFailed');
});  
router.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login/fail'
}));

module.exports = router;