var mongoose = require('mongoose'), Schema = mongoose.Schema;

var iwhSchema = new Schema({
	user: { type: String },
	label: { type: String },
	lat: { type: Number },
	lon: { type: Number }
});

module.exports = mongoose.model('IWH', iwhSchema);