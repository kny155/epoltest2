import { LOGIN, LOGOUT } from '../actions';

export default function reducer(state = [], action) {
	switch (action.type) {
		case LOGIN:
			return action.user;

		case LOGOUT:
			return {};

		default:
			return state;
	}
}
