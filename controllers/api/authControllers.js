const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const sendTokenAndResData = async (res, statusCode, user) => {
  const token = await createToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = async (req, res, next) => {
  // Instructions
  // 1. recieve user sign up data

  // 2. validate user sign up data (mongoose Lib)

  // 3.encrypt user passwrod
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    sendTokenAndResData(res, 201, newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      error: error,
    });
  }

  // 4. create and send JWTS
};
