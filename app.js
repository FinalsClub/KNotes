#! /usr/local/bin/node

/**
 * Import express, our framework. and the route/business logic files
 */
var express = require('express')
  , routes = require('./routes')
  , auth = require('connect-auth')
  , mongoose = require('./schema.js').mongoose;


/**
 *  Read env configs from the executing bash shell
 */
var hostname = process.env.SERVER_HOST
    , port = process.env.SERVER_PORT;

// Import the app wrapper object from express
var app = express.createServer()
// Mongoose (database) configuration
//var Note    = mongoose.model( 'Note' );
//var User    = mongoose.model( 'User' );


/**
 * App configuration in three parts:
 *  - General configuration
 *  - Development specific config
 *  - Production specific config
 */

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // app.use loads statements we want available to every route.
  // We should put mongoose.connect here. but maybe we should only load models as needed in routes.
  app.use(mongoose.connect('mongodb://localhost/kn'));
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

console.dir(routes);
console.dir(routes.note);
app.get('/', routes.index);
// routes.notes is not found if stored in notes.js. Hmm
app.get('/notes', routes.notes);
app.post('/upload', routes.upload);
/*app.get('/notes', function(req, res){
  console.log('inside the note route');
  console.log(Note);
  Note.find({}).run( function( err, notes ){
    if(err) console.log(err);
    console.log('notes');
    console.log(notes);
    res.json(notes);
  });
});
*/

// Exception Catch-All
process.on('uncaughtException', function (e) {
  console.log("!! %%%%% Uncaught Exception\n" + e.stack);
  });

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// I want to share the mongoose connection with routes
// not sure this is the ideal way

exports.mongoose = mongoose;
