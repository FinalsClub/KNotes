/* vim: set ts=2: */

var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema;

var RATING_MAX = 100;
var RATING_MIN = 0;

var Karma = new Schema ({
  action : Schema.ObjectId // ActionSchema
  , timestamp : Date
  , user : Schema.ObjectId
});

var Note = new Schema({
  filename : String
  , owner : Schema.ObjectId
  , course : Schema.ObjectId
  , size : Number
  , campus : [Campus]
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
  , professor : Schema.ObjectId
  , subject : Schema.ObjectId
  , midtermExams : [Date]
  , finalExam : Date
});

var Professor = new Schema({
  name : String
  , title : String
});

var Tag = new Schema({
  title : String
  , description : String
});

var Subject = new Schema({
  title : String
  , description : String
  , tags : [Tag]
});

module.exports.mongoose = mongoose;

// filename | placeholder for path to local file or to s3 file
// owner | foreign key to a user object, TODO: Create user schema
// size | size of the file in bytes, 
// TODO: make a pretty-print method that gives owner name and size in MiB
