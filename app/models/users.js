var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
	name: String,
    memberId: String,
	email: { type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: Boolean,
    time_created: Date,
    time_updated: { type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);
module.exports = User;

