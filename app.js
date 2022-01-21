// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });

var express = require("express");
var path = require("path");
var logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorhandler = require("./controllers/errorControllers");
// Route

const userRouterApi = require("./routes/api/userRoutes");
const userRouterViews = require("./routes/view/userRoutes");
// setup express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/main");

// boilerplate middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

// SSR routes
app.use("/nt/", userRouterViews);

// API routes
app.use("/api/v1/user/", userRouterApi);

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `This url ${req.originalUrl} was not found on this server.`,
      404
    )
  );
});

app.use(globalErrorhandler);

module.exports = app;
