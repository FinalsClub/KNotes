 #!/bin/bash
# A file to load sample data for development
#mongoimport -d kn -c note note.json

#Insert note records
mongoimport -d kn -c Note note.json

#Insert school records, with nested course info
mongoimport -d kn -c School schools.json


