/* vim: set ts=2: */

var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema;

<<<<<<< HEAD
var Karma = new Schema ({
  action : Action
  , timestamp : Date
  , user : Schema.ObjectId
});

var Note = new Schema({
  filename : String
  , owner : Schema.ObjectId
  , size : Number
  , course : Course
  , campus : Campus
  , votes : [Vote]
  , subjects : [Subject]
  , tags : [Tag]
});

var Vote = new Schema({
  user : Schema.ObjectId
  , up : Boolean
});

var Action = new Schema({
  shortname : String
  , description : String
  , karma_value : Number
  , icon : String
});

var Campus = new Schema({
  courses : [Course]
  , address : String
  , city : String
  , state : String
});

var Course = new Schema({
  title : String
  , professor : Professor
  , subject : Subject
  , midtermExams : [Date]
  , finalExam : Date
});

var Professor = new Schema({
  name : String
  , title : String
});

var Subject = new Schema({
  title : String
  , description : String
  , tags = [Tag]
});

var Tag = new Schema({
  title : String
  , description : String
});

=======
mongoose.connect('mongodb://localhost/data/db/');

var RATING_MAX = 100;
var RATING_MIN = 0;

var ExampleSchema = new Schema({
  filename : String
  , owner : Schema.ObjectId
  , size : Number
  , rating: Number({default:0, max:RATING_MAX, min:RATING_MIN})
});

>>>>>>> d6c06dd704d4812cf3bae13d28cb693af1b48e08
// filename | placeholder for path to local file or to s3 file
// owner | foreign key to a user object, TODO: Create user schema
// size | size of the file in bytes, 
// TODO: make a pretty-print method that gives owner name and size in MiB
