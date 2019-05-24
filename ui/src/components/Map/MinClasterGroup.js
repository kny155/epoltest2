import React, { useState, useEffect } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import TooltipInfo from './TooltipInfo';
import { crimeService } from '../../services';

const MinClasterGroup = ({ bounds }) => {
    const [crimes, setCrimes] = useState([]);
    const [boundsCrimes, setBoundsCrimes] = useState([0, 0, 0, 0]);

    useEffect(() => {
        onMapShift();
    }, [bounds]);

    const getCrimes = async (topY, botY, leftX, rightX) => {
        const data = await crimeService.getCrimes(topY, botY, leftX, rightX);
        setCrimes(data);
    };

    const onMapShift = async () => {
        const topY = bounds[0];
        const bootomY = bounds[1];
        const leftX = bounds[2];
        const rightX = bounds[3];

        if (
            !(
                topY <= boundsCrimes[0] &&
                bootomY >= boundsCrimes[1] &&
                leftX >= boundsCrimes[2] &&
                rightX <= boundsCrimes[3]
            )
        ) {
            setBoundsCrimes([topY, bootomY, leftX, rightX]);
            getCrimes(topY, bootomY, leftX, rightX);
        }
    };

    return (
        <MarkerClusterGroup
            spiderLegPolylineOptions={{
                weight: 0,
                opacity: 0,
            }}
        >
            {crimes.map(item => (
                <Marker
                    key={item.id}
                    position={[item.location.latitude, item.location.longitude]}
                >
                    <Tooltip>
                        <TooltipInfo crime={item} />
                    </Tooltip>
                </Marker>
            ))}
        </MarkerClusterGroup>
    );
};

export default MinClasterGroup;
