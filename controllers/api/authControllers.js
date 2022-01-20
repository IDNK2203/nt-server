const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");
const { promisify } = require("util");

// The basic Auth controllers
// 1. Signup _/
// 2. login _/
// 3. protect _/
// 4. logout _/
// 5. isLoggedIn

// Advance controllers
// 1. restrict
// 2. forget password
// 3. recovery password

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
    res.status(400).json({
      status: "error",
      error: error,
    });
  }

  // 4. create and send JWTS
};

exports.signin = async (req, res, next) => {
  try {
    // Instructions
    // 1. check if sent data is complete
    // 2. check if user email exists
    // 3. check if user password match data base
    // 4. create and send token
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email and  password reqiured");
    }
    const incomingUser = await User.findOne({ email: email }).select(
      "+password"
    );
    if (!incomingUser) {
      throw new Error("This user does not exist");
    }

    if ((await incomingUser.passwordCheck(password, incomingUser)) === false) {
      throw new Error("Incorrect Password, Pls try again");
    }
    sendTokenAndResData(res, 201, incomingUser);
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// verify the authenticity of the JWT token and pass user obj to next middleware
exports.protect = async (req, res, next) => {
  // Instructions
  // 1. check if token exist in cookie
  // 2. check if the cookie has exipred
  // 3. check if the jwt signature matches test jwt signature
  // 4. check if user still exists
  // 5. check if password was changed after user login in
  // 6. call the next middleware
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error(
        "you are not logged in please log in to view this resource",
        401
      );
    }

    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const incomingUser = await User.findById(decodedPayload.id);
    if (!incomingUser) throw new Error("This user no longer exists", 401);
    req.user = incomingUser;
    res.locals.user = incomingUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/nt/signin");
};

exports.isloggedIn = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next();
    }

    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const incomingUser = await User.findById(decodedPayload.id);
    if (!incomingUser) return next();
    res.locals.user = incomingUser;
    req.user = incomingUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
