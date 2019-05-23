import React, { useState, Fragment, useEffect } from 'react';
import { Marker, Rectangle } from 'react-leaflet';

import MarkerIcon from './MarkerIcon';
import { FIELD_WIDTH, FIELD_HEIGHT } from '../../config.json';

const MaxClasterGroup = ({ markers, mapRef, addMarkers, bounds }) => {
    const [draw, setDraw] = useState(false);
    const [boundsDraw, setBoundsDraw] = useState([]);

    useEffect(() => {
        onMapShift();
    }, [bounds]);

    const onMapShift = async () => {
        const topY = bounds[0];
        const bootomY = bounds[1];
        const leftX = bounds[2];
        const rightX = bounds[3];

        for (let i = leftX; i < rightX; i += FIELD_WIDTH) {
            let j = topY;
            for (j; j > bootomY; j -= FIELD_HEIGHT) {
                const x = +i.toFixed(1);
                const y = +j.toFixed(1);

                const check = markers.some(item => {
                    const id = i.toFixed(1) + '' + j.toFixed(1);
                    return item.id === id;
                });

                if (!check) {
                    addMarkers(x, y);
                }
            }
        }
    };

    return (
        <Fragment>
            {markers.map(
                item =>
                    item.len && (
                        <Marker
                            key={item.id}
                            position={[
                                item.pos[1] - FIELD_HEIGHT / 2,
                                item.pos[0] + FIELD_WIDTH / 2,
                            ]}
                            onMouseOver={() => {
                                setBoundsDraw(item.pos);
                                setDraw(true);
                            }}
                            onMouseOut={() => {
                                setDraw(false);
                            }}
                            onClick={() =>
                                mapRef.current.leafletElement.setView(
                                    [
                                        item.pos[1] - FIELD_HEIGHT / 2,
                                        item.pos[0] + FIELD_WIDTH / 2,
                                    ],
                                    14,
                                )
                            }
                            icon={MarkerIcon(item.len)}
                        />
                    ),
            )}
            {draw && (
                <Rectangle
                    onClick={() => {}}
                    bounds={[
                        [boundsDraw[1], boundsDraw[0]],
                        [
                            boundsDraw[1] - FIELD_HEIGHT,
                            boundsDraw[0] + FIELD_WIDTH,
                        ],
                    ]}
                />
            )}
        </Fragment>
    );
};

export default MaxClasterGroup;
