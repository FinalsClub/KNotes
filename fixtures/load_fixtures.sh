#!/bin/bash
# A script to load sample data for development

#Insert note records
mongoimport --db kn --collection notes notes.json

#Insert school records, with nested course and note info
mongoimport --db kn --collection schools schools.json


