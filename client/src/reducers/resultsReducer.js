import types from '../actions/types';

const DEFAULT_STATE = {
    playlist: [],
    pastedVideoUrl: ''
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.PLAY_VIDEO:
            return {...state, url: action.payload};
        case types.ADD_TO_PLAYLIST:
            return {...state, playlist: [...state.playlist, action.payload]};
        case types.GRAB_VIDEO_URL: 
            console.log("VIDEO URL: ", action.payload);
            return { ...state, pastedVideoUrl: action.payload }
        default:
            return state;
    }
}