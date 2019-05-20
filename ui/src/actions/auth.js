import axios from 'axios';
import { authService, commonService } from '../services';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
	return async dispatch => {
		axios.defaults.headers.common['Authorization'] = '';
		localStorage.removeItem('user');
		sessionStorage.removeItem('user');
		dispatch({
			type: LOGOUT,
		});
	};
};

export const login = (username, password, remember) => {
	return async dispatch => {
		const { token, user } = await authService.login(username, password);
		axios.defaults.headers.common['Authorization'] = token;
		if (remember) {
			localStorage.setItem('user', JSON.stringify(token));
		} else {
			sessionStorage.setItem('user', JSON.stringify(token));
		}
		dispatch({
			type: LOGIN,
			user,
		});
	};
};

export const relogin = () => {
	return async dispatch => {
		const token = commonService.getToken();
		axios.defaults.headers.common['Authorization'] = token;
		if (token) {
			try {
				const { user } = await authService.relogin();
				dispatch({
					type: LOGIN,
					user,
				});
			} catch {
				localStorage.removeItem('user');
				sessionStorage.removeItem('user');
			}
		}
	};
};
