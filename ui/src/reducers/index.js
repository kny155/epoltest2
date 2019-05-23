import { combineReducers } from 'redux';

import { default as authenticated } from './authenticated';
import { default as user } from './user';
import { default as markers } from './markers';

const reducer = combineReducers({
    authenticated,
    user,
    markers,
});

export default reducer;
