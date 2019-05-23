import { crimeService } from '../services';

export const ADD_MARKERS = 'ADD_MARKERS';
export const CLEAR_MARKERS = 'ADD_MARKERS';

export const addMarkers = (x, y) => {
    return async dispatch => {
        const markers = await crimeService.getCrimesLen(x, y);
        dispatch({
            type: ADD_MARKERS,
            markers,
        });
    };
};
