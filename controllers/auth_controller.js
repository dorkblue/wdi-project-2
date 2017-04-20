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
      req.flash('error', 'Oppsy, could not create user account, please try again!');
      res.redirect('/auth/signup');
    } else {
      passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/'
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
