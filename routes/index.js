//TODO: Share connection defined in ../app.js

// Define schema for mongoose
var mongoose = require('../schema.js').mongoose;


var ObjectId = require('mongoose').Types.ObjectId;

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
  
  // TODO: the courseToPopulate should be a request parameter;
  //var schoolToPopulate = "Harvard";
  var courseId = req.params.course;

  // to lookup nested objects, need to cat id string to ObjectId
  // see https://github.com/LearnBoost/mongoose/issues/389


  // Get object with access to database collection
  var SchoolAccObj  = mongoose.model( 'School' );
  SchoolAccObj.find({'courses._id': new ObjectId(courseId)},
                    ['name', 'courses._id', 'courses.title', 'courses.notes'],
                    function(err, obj){
    console.log(err);
    res.json(obj);
  });

};

exports.schools = function(req, res){
  mongoose.connect('mongodb://localhost/kn');
  var SchoolAccObj  = mongoose.model( 'School' );
  // retrieve all schools, all courses;
  SchoolAccObj.find({},
                    ['name', 'courses.title', 'courses._id'],
                    function(err, jsonObj){
    res.send(jsonObj);
  });
  // res.render('testquery.html', 
  //            { title: 'Values to be rendered go here' });
};




