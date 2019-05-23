import React from 'react';
import { CATEGORYS } from '../../config.json';

const style = {
    blockInfo: {
        listStyle: 'none',
        margin: 0,
        padding: '10px',
    },
};

const TooltipInfo = ({ crime }) => {
    return (
        <ul style={style.blockInfo}>
            <li>
                <b>Category: </b>
                {CATEGORYS[crime.category]}
            </li>
            {crime.outcome_status && (
                <li>
                    <b>Outcome category: </b>
                    {crime.outcome_status.category}
                </li>
            )}
            <li>
                <b>Location type: </b>
                {crime.location_type}
            </li>
            <li>
                <b>Street name: </b>
                {crime.location.street.name}
            </li>
            <li>
                <b>Data: </b>
                {crime.month}
            </li>
        </ul>
    );
};

export default TooltipInfo;
