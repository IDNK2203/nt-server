const AppError = require("../utils/appError");
// break logic into functions api response & view response

const sendDevErrors = (err, req, res) => {
  console.log("Dev Errors");
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  res.status(err.statusCode).render("public/error", {
    layout: "layouts/authLayout",
    title: "Error page",
    status: err.status,
    message: err.message,
    statusCode: err.statusCode,
  });
};

const prodApiErr = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: "Error",
    message: "Unknown error occured",
  });
};

const ProdSrrErr = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).render("public/error", {
      title: "Error page",
      message: err.message,
    });
  }
  res.status(500).render("public/error", {
    title: "Error page",
    status: "Error",
    message: "Unknown error occured",
  });
};

const sendProdErrors = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return prodApiErr(err, req, res);
  }
  ProdSrrErr(err, req, res);
};

// DB Errors
const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log(err);
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  console.log(errors);
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Token Errors
const invalidTokenError = () => {
  return new AppError(
    "invalid token detected , please try logging in again.",
    401
  );
};

const expiredTokenError = () => {
  return new AppError(
    "expired token detected , please try logging in again.",
    401
  );
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendDevErrors(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log("Prod");
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = invalidTokenError(error);
    if (error.name === "TokenExpiredError") error = expiredTokenError(error);

    sendProdErrors(error, req, res);
  }
};
