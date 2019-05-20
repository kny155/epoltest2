import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	mapSize: {
		width: '100%',
		height: '100%',
	},
};

const Map = ({ classes }) => {
	const center = [51.5073, -0.1276];
	return (
		<LeafletMap
			center={center}
			zoom={10}
			maxZoom={20}
			className={classes.mapSize}
		>
			<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
		</LeafletMap>
	);
};

export default withStyles(styles)(Map);
