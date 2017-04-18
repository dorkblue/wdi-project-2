module.exports = function(req, res, next) {
  console.log('Checking login', req.user)
  if (!req.user) {
    req.flash('error', 'Please log in to access that page :)');
    res.redirect('/');
  } else {
    next();
  }
};
