const express = require('express');
const router = express.Router();
const {passport} = require('../passport')

router.get('/', (req, res) => {
    res.render('login');
});
  
router.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;