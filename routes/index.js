//TODO: Share connection defined in ../app.js

// Define schema for mongoose
var mongoose = require('../schema.js').mongoose;

exports.index = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })
  res.sendfile( 'public/index.html' );
};

exports.notes = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })

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
  });
  //res.sendfile( 'public/index.html' );
  //res.send(School.count());
};
