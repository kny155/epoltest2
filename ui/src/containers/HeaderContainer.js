import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import { logout } from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => logout()(dispatch),
    };
};

const mapStateToProps = state => ({});

const HeaderContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Header),
);

export default HeaderContainer;
