import mongoose from 'mongoose';
import { DATABASE_URL } from '../../config.json';

import User from './user';
import Crime from './crime';

const connectDb = () => {
	return mongoose.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
	});
};

module.exports = {
	User,
	Crime,
	connectDb,
};
