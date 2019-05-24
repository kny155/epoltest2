import React, { useState, Fragment, useEffect } from 'react';
import { Marker, Rectangle } from 'react-leaflet';

import MarkerIcon from './MarkerIcon';
import { FIELD_WIDTH, FIELD_HEIGHT } from '../../config.json';

const MaxClasterGroup = ({ markers, mapRef, addMarkers, bounds }) => {
    const [draw, setDraw] = useState(false);
    const [boundsDraw, setBoundsDraw] = useState([]);
    const [mul, setMul] = useState(1);

    useEffect(() => {
        onMapShift();
        setMul(Math.abs(14 - bounds[4]));
        setDraw(false);
    }, [bounds]);

    const onMapShift = async () => {
        const topY = bounds[0];
        const botY = bounds[1];
        const leftX = bounds[2];
        const rightX = bounds[3];
        for (let i = leftX; i < rightX; i += FIELD_WIDTH) {
            let j = topY;
            for (j; j > botY; j -= FIELD_HEIGHT) {
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

    const getLen = marker => {
        return mul > 1
            ? markers.reduce((len, item) => {
                  if (
                      item.pos[0] >= marker.pos[0] &&
                      item.pos[0] < marker.pos[0] + FIELD_WIDTH * (mul - 0.5) &&
                      item.pos[1] <= marker.pos[1] &&
                      item.pos[1] > marker.pos[1] - FIELD_HEIGHT * (mul - 0.5)
                  ) {
                      return len + item.len;
                  }
                  return len;
              }, 0)
            : marker.len;
    };

    const onZoom = marker => {
        mapRef.current.leafletElement.setView(
            [
                marker.pos[1] - (FIELD_HEIGHT / 2) * mul,
                marker.pos[0] + (FIELD_WIDTH / 2) * mul,
            ],
            bounds[4] + 1,
        );
    };

    return (
        <Fragment>
            {markers
                .filter(
                    marker =>
                        (marker.pos[1] * 10) % mul === 0 &&
                        (marker.pos[0] * 10) % mul === 0,
                )
                .map(
                    marker =>
                        marker.len && (
                            <Marker
                                key={marker.id + '' + mul}
                                position={[
                                    marker.pos[1] - (FIELD_HEIGHT / 2) * mul,
                                    marker.pos[0] + (FIELD_WIDTH / 2) * mul,
                                ]}
                                onMouseOver={() => {
                                    setBoundsDraw(marker.pos);
                                    setDraw(true);
                                }}
                                onMouseOut={() => {
                                    setDraw(false);
                                }}
                                onClick={() => onZoom(marker)}
                                icon={MarkerIcon(getLen(marker))}
                            />
                        ),
                )}
            {draw && (
                <Rectangle
                    onClick={() => {}}
                    bounds={[
                        [boundsDraw[1], boundsDraw[0]],
                        [
                            boundsDraw[1] - FIELD_HEIGHT * mul,
                            boundsDraw[0] + FIELD_WIDTH * mul,
                        ],
                    ]}
                />
            )}
        </Fragment>
    );
};

export default MaxClasterGroup;
