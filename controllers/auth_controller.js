var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('../config/passport');

function createUser(req, res) {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }, function(err, createdUser) {
    if (err) {
      console.log('err', err)
      req.flash('error', 'Could not create user account');
      res.redirect('/auth/signup');
    } else {
      console.log('user is authenticated');
      passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/',
        failureFlash: 'Could not create account, please try again'
      })(req, res)
    }
  })
}

function loginUser(req, res) {
  passport.authenticate('local', {
  successRedirect: '/homepage',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  })(req, res)
}

module.exports = {
  createUser: createUser,
  loginUser: loginUser
}
