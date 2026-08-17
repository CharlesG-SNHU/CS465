require('dotenv').config();
console.log('APP.JS LOADED FRESH');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var cors = require('cors');
var passport = require('passport');

var indexRouter = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');
require('./app_api/models/db');
require('./app_api/config/passport');
var apiRouter = require('./app_api/routes/index');


var app = express();

app.use((req, res, next) => {
  console.log('HIT:', req.method, req.url);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/api', cors());
app.use('/api', function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  next();
});

//NOTE: Change this to feed the dynamic page over the static page
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ "message": err.name + ": " + err.message });
  }
});

module.exports = app;
