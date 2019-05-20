import { combineReducers } from 'redux';

import { default as auth } from './auth';

const reducer = combineReducers({
	auth,
});

export default reducer;
