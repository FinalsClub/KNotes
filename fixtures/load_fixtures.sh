#!/bin/bash

#Insert note records
mongoimport -d kn -c notes note.json

#Insert school records, with nested course info
mongoimport -d kn -c schools schools.json

# Insert User record
mongoimport -d kn -c users schools.json
