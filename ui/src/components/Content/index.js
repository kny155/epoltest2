import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MapContainer from '../../containers/MapContainer';

const styles = theme => ({
    layout: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing.unit * 8,
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing.unit * 7,
        },
    },
});

const Content = ({ classes }) => {
    return (
        <main className={classes.layout}>
            <MapContainer />
        </main>
    );
};

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
