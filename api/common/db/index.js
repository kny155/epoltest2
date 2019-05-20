import { User, connectDb } from '../../src/model';
import users from './data/users.json';

connectDb();

try {
	User.insertMany(users, () => {
		console.log('OK');
		process.exit();
	});
} catch (e) {
	console.log('Error: ', e);
}
