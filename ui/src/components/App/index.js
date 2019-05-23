import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Main from '../Main';
import LoginContainer from '../../containers/LoginContainer';

const App = ({ authenticated, onRelogin }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        relogin();
    }, []);

    const relogin = async () => {
        await onRelogin();
        setLoading(false);
    };

    return (
        <Router>
            {!loading && (
                <Switch>
                    <Route
                        path="/login"
                        render={() =>
                            authenticated ? (
                                <Redirect to="/" />
                            ) : (
                                <LoginContainer />
                            )
                        }
                    />
                    <Route
                        path="/"
                        render={() =>
                            authenticated ? <Main /> : <Redirect to="/login" />
                        }
                    />
                </Switch>
            )}
        </Router>
    );
};
export default App;
