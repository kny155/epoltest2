const mongoose = require('mongoose');
require('dotenv').config();

const users = require('./data/user.json')

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useFindAndModify: false,
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	organizationName: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

try {
	User.insertMany(users)
	console.log("OK");
} catch(e) {
	console.log("Error: ", e)
}

process.exit()