/* vim: set ts=2: */

// There are three collections: Users, Schools, and Notes.

var mongoose    = require('mongoose')
  , Schema      = mongoose.Schema
  , mongooseAuth = require('mongoose-auth');

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
  NoteID        : Schema.ObjectId
});  // Attention... this is meant to display all of a user's downlaods and uploads... see userschema below.
var UserSchema = new Schema({
  name        : String,
  schoolID    : Schema.ObjectId,
  otherSchool : String,
  gradYear    : String,
  email       : String,
  facebookid  : String,
  notesUp     : [NoteDescriptionSchema],  // displayed on the profile page - notes uploaded by a user
  notesDown   : [NoteDescriptionSchema],  // displayed on the profile page - notes downloaded by a user
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

// installing mongoose-auth plugin to auto-add fbid when needed, and to encrypt passwords
UserSchema.plugin(mongooseAuth, {
  facebook: true
});
UserSchema.plugin(mongooseAuth, {
    // Here, we attach _this_ User model to every module
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }

  , facebook: {
      everyauth: {
          myHostname: 'http://localhost:3000'
        , appId: 'YOUR APP ID HERE'
        , appSecret: 'YOUR APP SECRET HERE'
        , redirectPath: '/'
      }
    }
  , password: {
        loginWith: 'email'
      , extraParams: {
            // any decorative userfields not needed by the app otherwise can go here
            phone: String
          , name: {
                first: String
              , last: String
            }
        }
      , everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          , loginView: 'login.jade'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'register.jade'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
        }
    }
});

//===== SCHOOLS ===================================
var NoteDesc = new Schema({
  id: Schema.ObjectId,
  noteDesc: String
});
var fields = [
  "English",
  "Computer Science"
];
// The value of the field property must be taken from the
// fields array.
var CourseSchema = new Schema({
  title     : String,
  professor : String,
  field     : { type: String, enum: fields },
  acadYear  : String,
  daysOfWk  : String,  // e.g., MoWeFr  optional field
  hour      : String, // optionl field
  notes     : [NoteDesc],
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
  field         : { type: String, enum: fields },
  desc          : String,
  origfiletype  : String,
  origfilebytes : Number,
  origfilecontent : String,
  htmlcontent   : String,
  viewCount     : Number,  // number of views of the HTML content of a given Note.
  votes         : [VoteSchema],
  tags          : [String]
});

var User   = mongoose.model( 'User', UserSchema );
var School = mongoose.model( 'School', SchoolSchema );
var Note   = mongoose.model( 'Note', NoteSchema );

module.exports.mongoose = mongoose;
// should we export User, School, and Note?
