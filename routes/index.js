//TODO: Share connection defined in ../app.js

// Define schema for mongoose
var mongoose = require('../schema.js').mongoose;

exports.index = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })
  res.sendfile( 'public/index.html' );
};

exports.notes = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })

  // connect to Mongo database
  mongoose.connect('mongodb://localhost/kn');

  // Get object with access to database collection
  var SchoolAccObj  = mongoose.model( 'School' );
  //var Note    = mongoose.model( 'Note' );

  // Example: Create new document in collection
  // Gotcha: This saves the note in collection "notes"
  //var noteInstance = new Note();
  //noteInstance.field = 'English';
  //noteInstance.save();


  //   The JSON returned looks like this:
  //     { "schoolName": "BU",
  //       "courses": [
  //         { "course": "BU-111",
  //           "noteDesc": [ 'foo desc', 'bar desc', baz desc' ]
  //         },
  //         { . . . }
  //       ]
  //     }
  var schoolToPopulate = "Harvard";
  SchoolAccObj.find({name: schoolToPopulate},
                    ['name', 'courses.title', 'courses.notes'],
                    function(err, jsonObj){
    res.send(jsonObj);
  });
  //res.sendfile( 'public/index.html' );
  //res.send(School.count());
};
