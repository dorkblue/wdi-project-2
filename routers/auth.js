var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth_controller')

router.get('/signup', function(req, res) {
  res.render('auth/signup')
})

router.get('/login', function(req, res) {
  res.render('auth/login')
})

router.get('/logout', function(req, res) {
  req.logout()
  res.render('auth/logout')
})

router.post('/signup', authController.createUser)

router.post('/login', authController.loginUser)

module.exports = router;
