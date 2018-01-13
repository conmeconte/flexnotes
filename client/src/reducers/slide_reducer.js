import types from '../actions/types';

const DEFAULT_STATE = {
    input: '',
    inputValid: false,
    inputComplete: false
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_SLIDES_URL:
            console.log('slide_reducer', action.payload);
            return { input: action.payload, ...state }
        default:
            return state;
    }
};