exports.signup = (req, res, next) => {
  res.render("auth/signup", { layout: "layouts/authLayout" });
};

exports.profile = (req, res, next) => {
  res.render("private/profile", { layout: "layouts/authLayout" });
};
