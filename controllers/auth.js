var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('../config/passport');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// router.post('/signup', function(req, res) {
//   console.log('POST SIGNUP HEREERERER')
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   }, function(err, createdUser) {
//     console.log('hello???');
//     if (err) {
//       req.flash('error', 'Could not create user account');
//       res.redirect('/auth/signup');
//     } else {
//       passport.authenticate('local', {
//         successRedirect: '/testing',
//         failureRedirect: '/failed', // tom
//         successFlash: 'Account created and logged in'
//       })(req, res)
//     }
//   })
// })

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in!'
})
);

router.get('/logout', function(req, res) {
  req.logout();
  // res.redirect('/auth/logout');
  res.render('auth/login')
  req.flash('success', 'You have logged out');
});

module.exports = router;
