import types from '../actions/types';

const DEFAULT_STATE = {
  results: [],
  addedVideo: [],
  savedVideoTitle: '',
  savedVideoImage: '',
  toggleResults: true,
  resultsStyles: {
    transform: 'translateX(-100%)'
  },
  playlistStyles: {
    transform: 'translateY(-100%)'
  },
  videoLink: '',
  videoId: '',
  videoLinkSlideOut: {
    transform: 'translateY(-119px)'
  },
  toggleSlideOut: true
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.ADD_VIDEO_TO_DATABASE:
      return {
        ...state,
        addedVideo: action.payload.updatedPlaylist
      };
    case types.DELETE_FROM_PLAYLIST:
      return {
        ...state,
        addedVideo: action.payload
      };
    case types.GET_VIDEO_RESULTS:
      return { ...state, results: action.payload };
    case types.SET_VIDEO_PLAYLIST:
      return {
        ...state,
        addedVideo: action.payload
      };
    case types.GET_VIDEO_PLAYLIST:
      return {
        ...state,
        addedVideo: action.payload.data.video
      };
    case types.HANDLE_YOUTUBE_URL:
      return {
        ...state,
        videoId: action.payload
      };
    case types.SET_VIDEO_URL:
      return { ...state, videoLink: action.payload };
    case types.PLAY_PASTED_VIDEO_LINK:
      return { ...state, videoLink: action.payload };
    case types.PLAY_VIDEO:
      return {
        ...state,
        videoLink: action.payload.videoLink,
        resultsStyles: { transform: 'translateX(-100%)' }
      };
    case types.GET_SAVED_VIDEO_TITLE:
      return {
        ...state,
        savedVideoTitle: action.payload
      };

    case types.GET_SAVED_VIDEO_IMAGE:
      return {
        ...state,
        savedVideoImage: action.payload
      };
    case types.TOGGLE_PLAYLIST:
      return {
        ...state,
        playlistStyles: {
          transform: action.payload
        }
      };
    case types.TOGGLE_VIDEO_SLIDE_OUT:
      return {
        ...state,
        videoLinkSlideOut: action.payload.slideOutStyles,
        toggleSlideOut: action.payload.toggleSlideOut
      };
    case types.EMPTY_VIDEO_SLIDE_OUT:
      return {
        ...state,
        videoLinkSlideOut: action.payload.slideOutStyles.style
      };
    case types.GET_RESULT_STYLES:
      return {
        ...state,
        resultsStyles: action.payload,
        toggleResults: !state.toggleResults
      };
    case types.TOGGLE_RESULTS:
      return { ...state, toggleResults: !state.toggleResults };
    case types.GRAB_VIDEO_URL:
      return { ...state, videoLink: action.payload };
    case types.NO_VIDEO_LINK:
      return { ...state };
    default:
      return state;
  }
}
