import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './store';
import { relogin } from './actions';

relogin()(store.dispatch);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<CssBaseline />
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
