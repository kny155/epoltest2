import { createStore } from 'redux';

import reducer from '../reducers';

const initialState = {
	auth: false,
};

const store = createStore(reducer, initialState);

export default store;
