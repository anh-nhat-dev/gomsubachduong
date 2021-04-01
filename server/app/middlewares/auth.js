exports.isLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/panel/login");
  }
  return next();
};

exports.isLogout = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/panel/dashboard");
  }
  return next();
};
