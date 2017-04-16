var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('../config/passport');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.get('/logout', function(req, res) {
  req.logout();
  // res.redirect('/auth/logout');
  res.render('auth/logout')
  req.flash('success', 'You have logged out');
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

module.exports = router;
