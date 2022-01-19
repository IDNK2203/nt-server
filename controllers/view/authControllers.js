exports.signup = (req, res, next) => {
  res.render("auth/signup", { layout: "layouts/authLayout" });
};

exports.signin = (req, res, next) => {
  res.render("auth/signin", { layout: "layouts/authLayout" });
};
