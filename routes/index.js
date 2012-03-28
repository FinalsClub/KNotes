//TODO: Share connection defined in ../app.js

// Define schema for mongoose
var mongoose = require('../schema.js').mongoose;

exports.index = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })
  res.sendfile( 'public/index.html' );
};

exports.notes = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })

<<<<<<< HEAD
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
=======
  // Get object with access to database collection
  //var School  = mongoose.model( 'School' );
  var Note    = mongoose.model( 'Note' );

  // Example: Create new document in collection
  // Gotcha: This saves the note in collection "notes"
  //var noteInstance = new Note();
  //noteInstance.field = 'English';
  //noteInstance.save();

  Note.find({}, function(err, docs){
    console.log(err);
    // res.json will send the jsonified version of an object
    res.json(docs);
>>>>>>> 61bc6f6f915756064dde8c104afb3758268fbe62
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




