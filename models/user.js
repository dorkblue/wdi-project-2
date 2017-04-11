var mongoose = require('mongoose')

var userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: [true, 'Please input a username'],
    minlength: [3, 'Username is too short']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  }
})

var User = mongoose.model('User', userSchema)

module.exports = User
