import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from './user';

dotenv.config();

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
	});
};

module.exports = {
	User,
	connectDb,
};
