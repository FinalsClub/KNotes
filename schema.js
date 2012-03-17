/* vim: set ts=2: */

var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema;

var RATING_MAX = 100;
var RATING_MIN = 0;

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


// filename | placeholder for path to local file or to s3 file
// owner | foreign key to a user object, TODO: Create user schema
// size | size of the file in bytes, 
// TODO: make a pretty-print method that gives owner name and size in MiB
