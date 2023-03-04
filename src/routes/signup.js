const express = require('express');
const router = express.Router();
const {passport,isAuthenticated} = require('../passport')
const multer = require('multer');
const upload = multer();

router.get('/',isAuthenticated, (req, res) => {
    res.render('signup');
});

router.post('/', upload.fields([
    { name: 'key', maxCount: 1 },
    { name: 'cert', maxCount: 1 }
  ]), (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ mensaje: 'Usuario creado exitosamente!' });
    })(req, res, next);
  });
module.exports = router;