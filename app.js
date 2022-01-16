// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });

var express = require("express");
var path = require("path");
var logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");

// Route
const userRouterApi = require("./routes/api/userRoutes");
const userRouterSsr = require("./routes/view/userRoutes");
// setup express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/main");

// boilerplate middleware
app.use(express.json({ limit: "10kb" }));

if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

// SSR routes
app.use("/auth/", userRouterSsr);

// API routes
app.use("/api/v1/user/", userRouterApi);

// catch 404 and forward to error handler
app.all("*", (req, res, next, err) => {
  res.json({
    error: err.message,
  });
});

module.exports = app;
