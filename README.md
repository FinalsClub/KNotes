KarmaNotes.org Development ReadMe
---------------------------------

I. Introduction
===============

KarmaNotes.org is a community of shared online educational resources.  A student begins by uploading notes, syllabi, study guides, papers, problem sets, exams, and summaries as .doc, .docx, RTF, & PDF for which he or she receives Karma Points.  Each user can use Karma Points to browse and download files from the site.  

  [Full karma points reputation model coming soon]

II. User Activities
===================

1.  a. User arrives at homepage with one primary call to action: upload notes.  The only other link on the homepage is for "login".

    b. User uploads a document and provides meta data (file-type, school, subject, course title, & professor name) for that document and the user's email address.  The site will generate an email to authenticate the user email.

2. By clicking a link in the user's email, the user will be taken to a page and asked to enter a username and password to create an account.

3. The user is then taken to a profile page, which he/she can complete to earn Karma Points.  
Sample drawing: http://dl.dropbox.com/u/15975779/KarmaNotes%20Drawings/photo%202.JPG
The fields available are:
	1. Connect to Facebook
	2. School
	3. Year of graduation

4. Our site will display a link which the user will copy and paste into an email and send to his/her friends.  The user can also share this link over Facebook.  The user will earn Karma Points for each successful sign-up.

5. Once the user has reached 50 Karma Points, he or she will gain access to the entire database of Karma Notes content.

6. The user can browse Karma Notes content by school, subject, tag, courses, and notes.  Schools will be ordered in descending order of # of notes.

7. If a document is uploaded for a new school or course, then we will create a new school and course in our database.  These will appear in our listing of each ordered by the # of notes for each.


III. Implementation Decisions
=============================

Our application will be written in and served by a node.js server, because we all know Javascript  and it is extremely lean and fast.  We use MongoDB as our object database, because it is well supported and our data comes in large chunks.

Our reputation model is an enumeration of values for all "reputation events" in a separate file, called ReputationEvents.txt, which includes an array of all activities and corresponding point values, which the app will call as needed.  All events are logged as user activity in the user document as represented in our database schema below

Our schema consists of three collections: Schools, Users, & Notes and is as follows:

 A School document consists of these properties:
'''
    _id
    Name
    Tags (indexed): [ “foo”, “bar”, … ]
    Courses: [ {
      Subject
      Department
      Course Number
      Title
      Professor
      Description
      NoteIDs (indexed): [ _id, _id, … ]
      CourseTags (indexed): [ “foo”, “bar”, … ]
    }, … ]
'''

=====

  A User document consists of these properties:
 '''
    _id
    Name:
    Email:
    SchoolID: 
    FacebookID:
    Year of Graduation:
    Karma Events [ {}, {} ]  	//   these can be summed for total KP for each user
    Privileges {canUpload:, canRead:, canVote:, canComment:, canModerate:}   //  boolean values triggered by total KP values
    NotesContribIDs:  [ _id, _id, … ]
'''

=====

  A Note document consists of these properties:
 '''
    _id
    ContribByID: User._id
    Type: [ "notes," "syllabus," "study guide," "paper," "problem set," "exam," and "summary" ]
    NoteTags (indexed): [ “foo”, “bar”, … ]
    Votes: [ {userID: , date: Date("2011-09-19T02:10:11.3Z", upordown: }, … ]
    ContentMeta: { <from Word metadata> }
    Content: 
'''



File Uploading
==============

I've dropped in blueimp's file uploading service (/node_modules/blueimp-file-upload-node/server.js) because it's very well documented (https://github.com/blueimp/jQuery-File-Upload/wiki/API), and falls back to iframe transport for ye olde browsers. 

*Note* For now, you must explicitly run the upload service (/node_modules/blueimp-file-upload-node/server.js) before testing with /index.html.

Files are currently stored in /node_modules/blueimp-file-upload-node/public

Mongo and Mongoose Guide
========================
Install:

brew update
brew install mongodb

Run mongo:
mongod
-or-
mongod run --config /usr/local/Cellar/mongodb/2.0.2-i386/mongod.conf

Mongo shell:
mongo
-or-
/usr/local/Cellar/mongodb/2.0.2-i386/bin/mongo

Mongo import:
mongoimport -d DATABASE -c COLLECTION importfile.json
  
Show databases:
show dbs

Switch database:
use database

Show collections in current database:
show collections

// DB.COLLECTION.ACTION
db.things.save({item});
db.things.find();
it    // return rest of cursor objects
var cursor = db.things.find();
while(cursor.hasNext())
  

