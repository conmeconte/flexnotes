import types from '../actions/types';

const DEFAULT_STATE = {
    input: '',
    slideLinkSlideOut: {
        transform: 'translateY(-100px)'
    },
    toggleLectureSlideOut: true
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_SLIDES_URL:
            return { input: action.payload }
        case types.GET_SLIDES_URL:
        case types.RESET_SLIDES_URL:
            return { input: action.payload }
        case types.TOGGLE_SLIDE_OUT_MENU:
            return { ...state, slideLinkSlideOut: { transform: action.payload.slideOutStyles.transform }, toggleLectureSlideOut: action.payload.toggleSlideOut }
        default:
            return state;
    }
};