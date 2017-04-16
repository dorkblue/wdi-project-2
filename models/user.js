var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'Username must have at least 3 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must have at least 6 characters'],
  }
});

userSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified('password')) return next()
  var hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.password
    return ret
  }
}

var User = mongoose.model('User', userSchema)
module.exports = User
