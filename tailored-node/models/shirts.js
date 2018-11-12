const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

/*
const commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});
*/

const shirtSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    store: {
        type: String,
        required: true
    },
    imageurl: {
    	type: String,
    	required: true
    },
    siteurl: {
    	type: String,
    	required: true
    },
    vector: {
    	type: Array,
    	default: []
    },
    price: {
    	type: Currency,
    	required: true,
    	min: 0
    },
    email: {
        type: String,
        default: 'teamtailored@gmail.com'
    }
    //comments: [commentSchema]
},{
    timestamps: true
});

var Shirts = mongoose.model('Shirt', shirtSchema);

module.exports = Shirts;