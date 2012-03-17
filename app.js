#! /usr/local/bin/node

/**
 * Import express, our framework. and the route/business logic files
 */
var express = require('express')
  , routes = require('./routes')
  , auth = require('connect-auth')

// import schema.js for db models

/**
 *  Read env configs from the executing bash shell
 */
var hostname = process.env.SERVER_HOST
    , port = process.env.SERVER_PORT;

// Import the app wrapper object from express
var app = express.createServer()
// Mongoose (database) configuration
mongoose.connect('mongodb://localhost/data/db/');


/**
 * App configuration in three parts:
 *  - General configuration
 *  - Development specific config
 *  - Production specific config
 */

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({uploadDir:'./upload'}));
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
app.post('/upload', function(req, res, next) {
    console.log("/upload! "+req.body);
    console.log(req.files);
    console.log(req);
    res.write('ok');
    res.end();
    // /upload should act as a holding directory
    // when note upload is 'verified', it will be moved 
    // to /public/notes or likewise

});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
