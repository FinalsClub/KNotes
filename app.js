#! /usr/local/bin/node

/**
 * Import express, our framework. and the route/business logic files
 */
var express     = require('express');
var everyauth   = require('everyauth');
var mongoose    = require('./schema.js').mongoose;
var routes      = require('./routes');
var mongooseAuth = require('mongoose-auth');

/*
 * Helper middleware functions
 *    for things we want available before our routes load
 */
everyauth.debug = true;
/*
everyauth.everymodule.findUserById( function(id, callback) {
  // everyauth expects a form with an id field and a password field.
  // and passes the id and password on to you

  // TODO: make a user find by email
  User.findOne({'email': id.toLowerCase() }, function(err, user) {
    console.log('finding a user by email: ' + id.toLowerCase());
    if(err){ console.log("TODO: sendjson back on failed login")}
    callback();
  });
});

// don't worry about the login.ejs. all we have to do is post a login form with the right
// fields to that location. we need not render/display /login
everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/')
    .loginView('login.ejs')
    .authenticate( function(login, password) {
      var errors = [];
      if (!login) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length) return errors;
      var user = usersByLogin[login];
      if (!user) return ['Login failed'];
      if (user.password !== password) return ['Login failed'];
      return user;
    })
 */

var app = express.createServer()

// Mongoose (database) configuration
var Note    = mongoose.model( 'Note' );
var User    = mongoose.model( 'User' );

/**
 * App configuration in three parts:
 *  - General configuration
 *  - Development specific config
 *  - Production specific config
 */

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // app.use loads statements we want available to every route.
  // We should put mongoose.connect here. but maybe we should only load models as needed in routes.
  app.use(mongoose.connect('mongodb://localhost/kn'));
  app.use(express.bodyParser({uploadDir:'./upload'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  // everyauth
  //app.use(everyauth.middleware());
  app.use(mongooseAuth.middleware());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes
console.dir(routes);
// console.dir(routes.notes);
app.get('/', routes.index);
// routes.notes is not found if stored in notes.js. Hmm
// notes will return a set of notes given a courseID
app.get('/searchBySchool', routes.searchBySchool);
app.get('/notesOfSchool/:school', routes.notesOfSchool);
app.post('/upload', routes.upload);

app.get('/notes/:course', routes.notes);
app.get('/schools', routes.schools);
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

// load the EasyAuth helpers right before app load
mongooseAuth.helpExpress(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode",
            app.address().port, app.settings.env);
