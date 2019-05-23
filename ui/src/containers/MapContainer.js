import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Map from '../components/Map';
import { addMarkers } from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        addMarkers: (x, y) => addMarkers(x, y)(dispatch),
    };
};

const mapStateToProps = state => ({
    markers: state.markers,
});

const MapContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Map),
);

export default MapContainer;
