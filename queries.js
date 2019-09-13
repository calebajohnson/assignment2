/* Adds all the required libraries*/
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connects to database using mongoose */
mongoose.connect(config.db.uri)

// Demonstrates find query; finds Library West listing and displays it to the console
var findLibraryWest = function() {
  Listing.findOne({name : "Library West"}, function (err, entries) {
    if (err) return handleError(err);

    console.log(entries);
});
}

// Finds and removes listing with code 'CABL', and logs the removed document to the console
var removeCable = function() {

  Listing.findOneAndDelete({code : "CABL"}, function (err, entries) {
    if (err) return handleError(err);

    console.log(entries);
  })
};

// Updates the Phelps Lab address and displays the updated listing to the console
var updatePhelpsLab = function() {

  // Updates the listing
  Listing.updateOne({name : "Phelps Laboratory"}, {address : "1953 Museum Rd, Gainesville, FL 32603"}, function (err, entries) {
    if (err) return handleError(err);

  // Because updateOne returns the original query, need to find updated query first before logging to console
  Listing.findOne({name : "Phelps Laboratory"}, function (err, entries) {
    if (err) return handleError(err);

    console.log(entries);
  });
  }
)
};

// Retrieves all listings in the database and logs them to the console
var retrieveAllListings = function() {

  Listing.find(function(err, entries){
    console.log(entries);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
