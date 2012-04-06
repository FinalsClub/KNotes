#!/bin/bash
# A script to load sample data for development

# Insert notes records
mongoimport --db kn --collection notes notes.json

# Insert schools records, with nested course and note info
mongoimport --db kn --collection schools schools.json

# Insert users records
mongoimport --db kn --collection users users.json
