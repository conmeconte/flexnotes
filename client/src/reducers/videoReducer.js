import types from '../actions/types';

const DEFAULT_STATE = {
  results: [],
  addedVideo: [],
  savedVideoTitle: '',
  savedVideoImage: '',
  toggleResults: true,
  addVideoModal: {
    display: 'none'
  },
  resultsStyles: {
    transform: 'translateX(-100%)'
  },
  playlistStyles: {
    transform: 'translateY(-100%)'
  },
  opacityDisplay: {
    display: 'none'
  },
  videoLink: '',
  videoLinkSlideOut: {
    transform: 'translateY(-119px)'
  },
  toggleSlideOut: true
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.GET_VIDEO_RESULTS:
      return { ...state, results: action.payload };
    case types.ADD_VIDEO_TO_DATABASE:
      return { ...state, addedVideo: [action.payload, ...state.addedVideo] };
    case types.GET_RESULT_STYLES:
      return {
        ...state,
        resultsStyles: action.payload,
        toggleResults: !state.toggleResults
      };
    case types.GRAB_VIDEO_URL:
      return { ...state, videoLink: action.payload };
    case types.TOGGLE_RESULTS:
      return { ...state, toggleResults: !state.toggleResults };
    case types.GET_OPACITY_DISPLAY:
      return { ...state, opacityDisplay: action.payload };
    case types.TOGGLE_MODAL:
      return { ...state, addVideoModal: { display: action.payload } };
    case types.PLAY_PASTED_VIDEO_LINK:
      return { ...state, videoLink: action.payload };
    case types.PLAY_VIDEO:
      return {
        ...state,
        videoLink: action.payload.videoLink,
        resultsStyles: { transform: 'translateX(-100%)' }
      };
    case types.NO_VIDEO_LINK:
      return { ...state };
    case types.SET_VIDEO_URL:
      return { ...state, videoLink: action.payload };
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
    case types.SET_VIDEO_PLAYLIST:
      return {
        ...state,
        addedVideo: action.payload
      };
    case types.TOGGLE_PLAYLIST:
      return {
        ...state,
        playlistStyles: {
          transform: action.payload
        }
      };
    default:
      return state;
  }
}
