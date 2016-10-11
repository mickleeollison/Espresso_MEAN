var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
	passport = require('passport'),
	flash = require('connect-flash');

module.exports = function(app, config) {
  app.set('view engine', 'html');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(flash());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'coffee shop application',resave:false,saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());
}