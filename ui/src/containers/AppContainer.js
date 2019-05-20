import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

const mapStateToProps = state => ({
	user: state.auth,
});

const AppContainer = withRouter(connect(mapStateToProps)(App));

export default AppContainer;
