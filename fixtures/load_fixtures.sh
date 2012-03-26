 #!/bin/bash
# A file to load sample data for development
#mongoimport -d kn -c note note.json

#Insert note records
mongoimport -d kn -c notes note.json

#Insert school records, with nested course info
mongoimport -d kn -c schools schools.json


