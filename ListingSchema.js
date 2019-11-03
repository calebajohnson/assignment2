/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

// Schema for the data in the listings.json file that will define how data is saved in the database
var listingSchema = new Schema({
	// Code for schema
  	"code": String, 
 	"name": String, 
	"coordinates": {
  		"latitude": Number, 
    	"longitude": Number
	}, 
    "address": String
});

// 'Pre' function that adds the updated_at (and created_at if not already there) property
listingSchema.pre('save', function(next) {
	// Creates current date variable
  	var currentDate = new Date();

  	// Throws an error if name or code is not provided
  	if (this.name == null || this.code == null)
  		throw err;

  	// Save currentDate to updated_at
  	this.updated_at = currentDate;

  	// Updates created_at if doesn't already exist
  	if (!this.created_at)
  		this.created_at = currentDate;

  	next();
});

// Instantiates a Mongoose model
var Listing = mongoose.model('Listing', listingSchema);

// Exports the model to make it avaiable to other parts of Node application
module.exports = Listing;
