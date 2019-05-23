import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const Header = ({ classes, onLogout }) => {
    return (
        <AppBar color="default" className={classes.appBar}>
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Epol Test
                </Typography>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => onLogout()}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
