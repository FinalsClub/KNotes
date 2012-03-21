/* vim: set ts=2: */

// There are three collections: Users, Schools, and Notes.
// 
var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema;

var RATING_MAX = 100;
var RATING_MIN = 0;

//====== USERS ====================================
// Action values are taken from this array:
var ReputationEvents = [
  { descr: "contribute a note", value: 15, icon: "<char>" },
  {}
];

// The descr and value properties have values which come
// from some element of the ReputationEvents array.  The
// author is the user who instigated the ReputationEvent;
// this user if null;
var ReputationEventSchema = new Schema ({
  desc      : String,
  value     : Number,
  authorID  : Schema.ObjectId,
  timestamp : Date
});
var NoteDescriptionSchema = new Schema ({
    title         : String,
    field         : String,
    desc          : String,
    NoteID        : Schema.ObjectID,
});  // Attention... this is meant to display all of a user's downlaods and uploads... see userschema below.
var UserSchema = new Schema({
  name        : String,
  schoolID    : Schema.ObjectId,
  otherSchool : String,
  gradYear    : String,
  email       : String,
  facebookid  : String,
  notesUp     : [NoteDescription],  // displayed on the profile page - notes uploaded by a user 
  notesDown   : [NoteDescription],  // displayed on the profile page - notes downloaded by a user 
  karmas      : [ReputationEventSchema],
  privileges  : {
    canUpload   : Boolean,
    canRead     : Boolean,
    canVote     : Boolean,
    canComment  : Boolean,
    canModerate : Boolean
  },
  noteIDs       : [Schema.ObjectId],
  tags          : [String]
});

//===== SCHOOLS ===================================
var fields = [
  "English", 
  "Computer Science"
];
// The value of the field property must be taken from the
// fields array.
var CourseSchema = new Schema({
  title     : String,
  professor : String,
  field     : String,
  acadYear  : String,
  daysofwk  : String,  // e.g., MoWeFr  optional field
  hour      : String, // optionl field
  notes     : [Schema.ObjectId],
  tags      : [String]
});
var SchoolSchema = new Schema({
  name      : String,
  location  : String,
  url       : String,
  courses   : [CourseSchema],
  tags      : [String],
  hostnames : [String] // e.g., alumni.upenn.edu
});

//===== NOTES ====================================
var VoteSchema = new Schema({
  user     : Schema.ObjectId,
  upordown : String
});
var NoteSchema = new Schema({
  contributorID : Schema.ObjectId,
  field         : String,
  desc          : String,
  origfiletype  : String,
  origfilebytes : Number,
  origfilecontent : String,
  htmlcontent   : String,
  votes         : [VoteSchema],
  tags          : [String]
});

var User   = mongoose.model( 'User', UserSchema );
var School = mongoose.model( 'School', SchoolSchema );
var Note   = mongoose.model( 'Note', NoteSchema );

module.exports.mongoose = mongoose;
// should we export User, School, and Note?
