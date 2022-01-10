// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });

var express = require("express");
var path = require("path");
var logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");

// setup express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/main");

// boilerplate middleware
if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
