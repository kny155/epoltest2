import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import Main from '../Main';
import LoginContainer from '../../containers/LoginContainer';
import { commonService } from '../../services';

const App = () => {
	const checkToken = !!commonService.getToken();

	return (
		<Router>
			<Switch>
				<Route
					path="/login"
					render={() => (checkToken ? <Redirect to="/" /> : <LoginContainer />)}
				/>
				<Route
					path="/"
					render={() => (checkToken ? <Main /> : <Redirect to="/login" />)}
				/>
			</Switch>
		</Router>
	);
};

export default App;
