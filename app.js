#! /usr/local/bin/node

/**
 * Import express, our framework. and the route/business logic files
 */
var express = require('express')
  , routes = require('./routes')
  , mongoose = require('./schema.js').mongoose
  , auth = require('connect-auth')

// Import the app wrapper object from express
var app = module.exports = express.createServer();

// Mongoose (database) configuration

// TODO: get 
//mongoose.connect('mongodb://'+hostname+

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
