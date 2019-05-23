import { ADD_MARKERS } from '../actions';

export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_MARKERS:
            const check = state.some(item => {
                return item.id === action.markers.id;
            });
            return check ? [...state] : [...state, action.markers];

        default:
            return state;
    }
}
