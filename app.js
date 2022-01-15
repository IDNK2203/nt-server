// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });

var express = require("express");
var path = require("path");
var logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");

// Route
const userRouter = require("./routes/userRoutes");
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

app.use("/user", userRouter);
// catch 404 and forward to error handler
app.all("*", (req, res, next, err) => {
  res.json({
    error: err.message,
  });
});

module.exports = app;
