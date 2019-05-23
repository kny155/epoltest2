import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

const style = {
    bigCircle: {
        width: '50px',
        height: '50px',
        marginLeft: '-25px',
        marginTop: '-25px',
        backgroundColor: 'rgba(200, 0, 0, .6)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallCircle: {
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 0, 0, .6)',
    },
};

const MarkerIcon = ({ count }) => {
    return (
        <div style={style.bigCircle}>
            <div style={style.smallCircle}>
                <span>{count}</span>
            </div>
        </div>
    );
};

export default count =>
    divIcon({
        iconSize: 0,
        html: ReactDOMServer.renderToString(<MarkerIcon count={count} />),
    });
