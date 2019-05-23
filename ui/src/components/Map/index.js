import React, { useState, useEffect, useRef } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import MinClasterGroup from './MinClasterGroup';
import MaxClasterGroup from './MaxClasterGroup';

import 'react-leaflet-markercluster/dist/styles.min.css';

const styles = {
    mapSize: {
        width: '100%',
        height: '100%',
    },
};

const Map = ({ classes, markers, addMarkers }) => {
    const [zoom, setZoom] = useState(false);
    const mapRef = useRef();
    const [bounds, setBounds] = useState([0, 0, 0, 0]);
    useEffect(() => {
        onMapShift();
    }, []);

    const onMapShift = async () => {
        const el = mapRef.current.leafletElement;
        const zoom = el._zoom;
        const bounds = el.getBounds();
        const northEast = bounds._northEast;
        const southWest = bounds._southWest;

        const topY = northEast.lat;
        const bootomY = southWest.lat;
        const leftX = southWest.lng;
        const rightX = northEast.lng;

        setBounds([topY, bootomY, leftX, rightX]);

        setZoom(zoom >= 14);
    };

    return (
        <LeafletMap
            onMoveEnd={onMapShift}
            center={[51.5073, -0.1276]}
            zoom={12}
            maxZoom={20}
            minZoom={11}
            className={classes.mapSize}
            ref={mapRef}
        >
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            {zoom ? (
                <MinClasterGroup bounds={bounds} />
            ) : (
                <MaxClasterGroup
                    markers={markers}
                    mapRef={mapRef}
                    addMarkers={addMarkers}
                    bounds={bounds}
                />
            )}
        </LeafletMap>
    );
};

export default withStyles(styles)(Map);
