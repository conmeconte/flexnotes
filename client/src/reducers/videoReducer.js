import types from '../actions/types';

const DEFAULT_STATE = { 
    videos: [],
    resultsStyles: {
        width: '65%',
        display: 'block'
    },
    opacityDisplay: {
        display: 'block'
    },
    toggleResults: true
 };

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.ADD_TO_PLAYLIST:
            return {...state, videos};
        case types.GET_RESULT_STYLES:
            return {...state, resultsStyles: action.payload, toggleResults: !state.toggleResults}
        case types.TOGGLE_RESULTS:
        return {...state, toggleResults: !state.toggleResults}
        case types.GET_OPACITY_DISPLAY:
            return { ...state, opacityDisplay: action.payload }
        default:
            return state;
    }
}