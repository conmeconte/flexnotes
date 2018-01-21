import types from '../actions/types';

const DEFAULT_STATE = {
    input: '',
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_SLIDES_URL:
            return { input: action.payload }
        default:
            return state;
    }
};