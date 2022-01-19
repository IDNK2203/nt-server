exports.profile = (req, res, next) => {
  res.render("private/profile", { layout: "layouts/authLayout" });
};
