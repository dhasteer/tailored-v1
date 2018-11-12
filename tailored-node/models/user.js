var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	firstname : {
		type: String,
		default: ''
	},
	email : {
		type: String,
		default: ''
	},
	admin : {
		type: Boolean,
		default: false
	},
	vector : {
		type: Array,
		default: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);