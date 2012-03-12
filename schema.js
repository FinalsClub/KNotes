/* vim: set ts=2: */

var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema;

mongoose.connect('mongodb://localhost/data/db/');

var RATING_MAX = 100;
var RATING_MIN = 0;

var ExampleSchema = new Schema({
  filename : String
  , owner : Schema.ObjectId
  , size : Number
  , rating: Number({default:0, max:RATING_MAX, min:RATING_MIN})
});

// filename | placeholder for path to local file or to s3 file
// owner | foreign key to a user object, TODO: Create user schema
// size | size of the file in bytes, 
// TODO: make a pretty-print method that gives owner name and size in MiB
