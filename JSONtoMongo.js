'use strict';
// Imports required modules/files 
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

    var listingData; // Will store parsed JSON data

/* Connects to database using mongoose */
mongoose.connect(config.db.uri)

/*
  Reads from JSON file and instantiates a mongoose model for each listing object in the JSON file, 
  and then saves it to Mongo database 
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
  //Check for errors
  if (err) throw err;

  // Parses JSON data and saves to listingData
  listingData = JSON.parse(data);
  
  // For each 'entries' element, stores element into new Listing object
  listingData.entries.forEach(function(entries) {
    new Listing(entries).save(function(err, entries){
    });
  })
});
