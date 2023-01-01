var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session');
var indexRouter = require("./routes/index");
var productsRouter = require("./routes/product");
var categoryRouter = require("./routes/category");
var userRouter = require("./routes/user");
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fsExtra = require('fs-extra');
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 100000 }
}));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/images/'
}));
app.use(fileUpload());
app.use("/", indexRouter);
app.use("/apiproduct", productsRouter);
app.use("/apicategory", categoryRouter);
app.use("/apiuser", userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT ,()=>{
  
})


module.exports = app;
