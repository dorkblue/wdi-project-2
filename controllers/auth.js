var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }, function(err, createdUser) {
    if(err){
      res.redirect('/auth/signup');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
