//TODO: Share connection defined in ../app.js

// Define schema for mongoose
var mongoose = require('../schema.js').mongoose;

exports.index = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })
  res.sendfile( 'public/index.html' );
};

exports.notes = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })

  //   The JSON returned looks like this:
  //     { "schoolName": "BU",
  //       "courses": [
  //         { "course": "BU-111",
  //           "noteDesc": [ 'foo desc', 'bar desc', baz desc' ]
  //         },
  //         { . . . }
  //       ]
  //     }
  
  // TODO: the schoolToPopulate should be a request parameter;
  var schoolToPopulate = "Harvard";
  
  // Get object with access to database collection
  var SchoolAccObj  = mongoose.model( 'School' );
  SchoolAccObj.find({name: schoolToPopulate},
                    ['name', 'courses.title', 'courses.notes'],
                    function(err, obj){
    res.json(obj);
  });
  //res.sendfile( 'public/index.html' );
  //res.send(School.count());
};

exports.testquery = function(req, res){
  mongoose.connect('mongodb://localhost/kn');
  var SchoolAccObj  = mongoose.model( 'School' );
  // retrieve all schools, all courses;
  SchoolAccObj.find({},
                    ['name', 'courses.title', 'courses.notes'],
                    function(err, jsonObj){
    res.send(jsonObj);
  });
  // res.render('testquery.html', 
  //            { title: 'Values to be rendered go here' });
};




