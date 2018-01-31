import types from '../actions/types';

const DEFAULT_STATE = {
    playlist: [],
    youtubeLink: '',
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.PLAY_VIDEO:
            return {...state, youtubeLink: action.payload };
        case types.ADD_TO_PLAYLIST:
            if (!action.payload) {
                return state;
            }
            return {...state, playlist: [action.payload, ...state.playlist]};
        case types.GRAB_VIDEO_URL: 
            return { ...state, videoLink: action.payload }
        default:
            return state;
    }
}