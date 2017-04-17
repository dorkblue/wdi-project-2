module.exports = function(req, res, next) {
  console.log('Checking login', req.user)
  if (!req.user) {
    req.flash('error', 'HEY YOU! You must be logged in to access that page');
    res.redirect('/auth/login');
  } else {
    next();
  }
};
