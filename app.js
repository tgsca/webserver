var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// Required data objects
var testStatus = require('./routes/testStatus');
var blogposts = require('./routes/blogposts');

var app = express();

// Connect to mongodb
var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost/testgilde';
mongoose.connect(dbPath);
var db = mongoose.connection;

db.on('error', function callback(){
  console.log("Verbindung zu MongoDB fehlgeschlagen");
  console.log("[" + dbPath + "]");
});

db.once('open', function callback(){
  console.log("Verbindung zu MongoDB erfolgreich");
  console.log("[" + dbPath + "]");
});

// usages
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var api = '/api/v1';
var rss = '/rss';

app.use(api + '/test-status', testStatus);
app.use(rss + '/blogposts', blogposts);

/**
 * Error handling
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({error: err.message});
});

/**
 * Export
 */

module.exports = app;
