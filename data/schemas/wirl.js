var mongoose = require('mongoose');

var WirlSchema = new mongoose.Schema({
	url: String,
	author: String,
	title: String,
	comments: String
});

module.exports = WirlSchema;