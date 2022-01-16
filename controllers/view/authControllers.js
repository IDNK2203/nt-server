exports.signup = (req, res, next) => {
  res.render("auth/signup", { layout: "layouts/authLayout" });
};
