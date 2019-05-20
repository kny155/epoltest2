import mongoose from 'mongoose';
import { DATABASE_URL } from '../../config.json';

import User from './user';

const connectDb = () => {
	return mongoose.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
	});
};

module.exports = {
	User,
	connectDb,
};
