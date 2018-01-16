import types from '../actions/types';

const DEFAULT_STATE = { 
    results: [],
    videoList: [],
    videoTitle: '',
    toggleResults: true,
    deleteModal: {
        display: 'none'
    },
    resultsStyles: {
        width: '50%',
        display: 'block'
    },
    opacityDisplay: {
        display: 'block'
    },
 };

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_VIDEO_RESULTS:
            return { ...state, results: action.payload}
        case types.ADD_TO_PLAYLIST:
            return {...state, videoList: [action.payload, ...state.videoList]};
        case types.GET_RESULT_STYLES:
            return {...state, resultsStyles: action.payload, toggleResults: !state.toggleResults}
        case types.TOGGLE_RESULTS:
        return {...state, toggleResults: !state.toggleResults}
        case types.GET_OPACITY_DISPLAY:
            return { ...state, opacityDisplay: action.payload }
        case types.TOGGLE_MODAL:
            return { ...state, deleteModal: { display: action.payload } }
        case types.GET_VIDEO_TITLE: 
            return {...state, videoTitle: action.payload}
        default:
            return state;
    }
}