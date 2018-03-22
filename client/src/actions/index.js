import axios from 'axios';
import types from './types';
import keys from '../config/keys';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: types.FETCH_USER, payload: res.data });
};

export const fetchSampleUser = () => dispatch => {
  //console.log('fetchUser called');
  axios
    .post('/auth/sample', {
      username: 'sample',
      password: 'samplePw'
    })
    .then(() => {
      // window.location.href = 'http://localhost:3000/main'
      dispatch({ type: types.FETCH_SAMPLE_USER, payload: res });
    })
    .catch(err => {
      //axios call not receive a res but sample user logged in, so redirect as err occurs
      window.location = '/main';
      //console.log('reached back');
      dispatch({
        type: types.AXIOS_ERROR,
        msg: 'Failed to update Top Left Panel Height'
      });
    });
};

//PANEL SPECs Action Creator

export function setTopLeftHeight(num, interfaceObj) {
  //console.log('panel 3 settopleft: ', num / window.innerHeight);
  return dispatch => {
    axios
      .put('/api/page', {
        top_left_panel_height: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      })
      .then(resp => {
        dispatch({
          type: types.PANEL_TOP_LEFT_HEIGHT,
          payload: num
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to update Top Left Panel Height'
        });
      });
  };
}

export function setTopLeftWidth(num, interfaceObj) {
  return dispatch => {
    axios
      .put('/api/page', {
        top_left_panel_width: num / window.innerWidth,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      })
      .then(resp => {
        dispatch({
          type: types.PANEL_TOP_LEFT_WIDTH,
          payload: num
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to update Top Left Panel Width'
        });
      });
  };
}

export function setTopRightHeight(num, interfaceObj) {
  return dispatch => {
    axios
      .put('/api/page', {
        top_right_panel_height: num.window.innerHeight,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      })
      .then(resp => {
        dispatch({
          type: types.PANEL_TOP_RIGHT_HEIGHT,
          payload: num
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to update Top Right Panel Height'
        });
      });
  };
}

export function setNumOfPanels(num, interfaceObj) {
  return dispatch => {
    axios
      .put('/api/page', {
        number_of_panels: num,
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      })
      .then(resp => {
        dispatch({
          type: types.NUM_OF_PANELS,
          payload: num
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to update Number of Panels'
        });
      });
  };
}

export function getPanelNum(num) {
  return {
    type: types.GET_PANEL_NUM,
    payload: num
  };
}

// Notes Action Creator
export function saveNotes(val, interface_obj) {
  const content = JSON.stringify(val.toJSON());
  return dispatch => {
    axios
      .put('/api/note', {
        document: { content },
        binderID: interface_obj.binder_id,
        tabID: interface_obj.tab_id,
        pageID: interface_obj.page_id
      })
      .then(resp => {
        //console.log('saveNotes RESP: ', resp.data);
        let payload = {
          notes: resp.data.notes,
          binderID: interface_obj.binder_id,
          tabID: interface_obj.tab_id,
          pageID: interface_obj.page_id
        };
        //console.log('save notes payload', payload);

        dispatch({
          type: types.SAVE_NOTES,
          payload: payload
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to Save Notes'
        });
      });
  };
}

export function autoSaveNotes(val, interface_obj) {
  const content = JSON.stringify(val.toJSON());
  return dispatch => {
    axios
      .put('/api/note', {
        document: { content },
        binderID: interface_obj.binder_id,
        tabID: interface_obj.tab_id,
        pageID: interface_obj.page_id
      })
      .then(resp => {
        //console.log('saveNotes RESP: ', resp.data);
        let payload = {
          notes: resp.data.notes,
          binderID: interface_obj.binder_id,
          tabID: interface_obj.tab_id,
          pageID: interface_obj.page_id
        };
        //console.log('save notes payload', payload);

        dispatch({
          type: types.AUTO_SAVE_NOTES,
          payload: payload
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to Save Notes'
        });
      });
  };
}

//Lecture Slides Action Creator

export function setSlidesUrl(slidesURL, interfaceObj) {
  return dispatch => {
    axios
      .put('/api/page', {
        lecture_slides: {
          lec_id: slidesURL
        },
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      })
      .then(resp => {
        console.log('setSlidesUrl response: ', resp);
        dispatch({
          type: types.SET_SLIDES_URL,
          payload: slidesURL
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to update Google Slides URL'
        });
      });
  };
}

export function getSlidesURL(slidesURL) {
  return {
    type: types.GET_SLIDES_URL,
    payload: slidesURL
  };
}

export function resetSlidesURL(slidesURL) {
  return {
    type: types.RESET_SLIDES_URL,
    payload: slidesURL
  };
}

// End of Lecture Slides Action Creators

//Video Action Creators
export const getSavedVideoTitle = videoId => async dispatch => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${keys.YOUTUBE_API_KEY}`
  );
  dispatch({
    type: types.GET_SAVED_VIDEO_TITLE,
    payload: response.data.items[0].snippet.title
  });
};
export const getSavedVideoImg = videoId => async dispatch => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${keys.YOUTUBE_API_KEY}`
  );

  dispatch({
    type: types.GET_SAVED_VIDEO_IMAGE,
    payload: response.data.items[0].snippet.thumbnails.default.url
  });
};
export function getVideoResults(videos) {
  return {
    type: types.GET_VIDEO_RESULTS,
    payload: videos
  };
}
export function setVideoPlaylist(videos) {
  return {
    type: types.SET_VIDEO_PLAYLIST,
    payload: videos
  };
}
export function getVideoPlaylist(binderID, tabID, pageID) {
  return async dispatch => {
    const response = await axios.get(
      `/api/video?binderID=${binderID}&tabID=${tabID}&pageID=${pageID}`,
      {}
    );
    try {
      dispatch({
        type: types.GET_VIDEO_PLAYLIST,
        payload: response
      });
    } catch (error) {
      dispatch({
        type: types.AXIOS_ERROR,
        payload: response
      });
    }
  };
}
export function addVideoToDatabase(
  videoId,
  videoTitle,
  videoImg,
  interfaceObj
) {
  return async dispatch => {
    try {
      const response = await axios.post('/api/video', {
        video: {
          videoTitle: videoTitle,
          videoId: videoId,
          videoURL: `https://www.youtube.com/embed/${videoId}`,
          videoImg: videoImg
        },
        binderID: interfaceObj.binder_id,
        tabID: interfaceObj.tab_id,
        pageID: interfaceObj.page_id
      });
      dispatch({
        type: types.ADD_VIDEO_TO_DATABASE,
        payload: {
          videoInfo: {
            videoTitle: videoTitle,
            videoId: videoId,
            videoURL: videoLink,
            videoImg: videoImg
          },
          updatedPlaylist: response.data.video
        }
      });
    } catch (error) {
      dispatch({
        type: types.AXIOS_ERROR,
        msg: 'Add to Playlist Failed.'
      });
    }
  };
}
export function removeVideoFromPlaylist(binderId, tabId, pageId, videoId) {
  return async dispatch => {
    const response = await axios
      .delete(
        `/api/video?binderID=${binderId}&tabID=${tabId}&pageID=${pageId}&videoId=${videoId}`,
        {}
      )
      .then(res => {
        dispatch({
          type: types.DELETE_FROM_PLAYLIST,
          payload: res.data.video
        });
      })
      .catch(error => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Add to Playlist Failed.'
        });
      });
  };
}
export function grabVideoUrl(videoLink) {
  return {
    type: types.GRAB_VIDEO_URL,
    payload: videoLink
  };
}
export function setVideoUrl(id) {
  return {
    type: types.SET_VIDEO_URL,
    payload: `https://www.youtube.com/embed/${id}`
  };
}
export function playVideo(videoId) {
  return {
    type: types.PLAY_VIDEO,
    payload: {
      videoLink: `https://www.youtube.com/embed/${videoId}`,
      resultsContainer: { style: { transform: 'translateY(0px)' } }
    }
  };
}
export function playPastedLinkVideo(id) {
  const videoId = `https://www.youtube.com/embed/${videoId}`;
  return {
    type: types.PLAY_PASTED_VIDEO_LINK,
    payload: videoId
  };
}
export function slideOutVideoSearch(visible) {
  let toggleSlideOut = visible;
  var slideOutStyles;
  if (toggleSlideOut) {
    slideOutStyles = 'translateY(27px)';
    toggleSlideOut = false;
  } else {
    slideOutStyles = 'translateY(-119px)';
    toggleSlideOut = true;
  }
  return {
    type: types.TOGGLE_VIDEO_SLIDE_OUT,
    payload: { slideOutStyles: { transform: slideOutStyles }, toggleSlideOut }
  };
}
export function emptyVideoSlideOut(toggleBool, slide) {
  let toggleSlideOut = toggleBool;
  let slideOutStyles = slide.style;
  if (toggleSlideOut) {
    slideOutStyles = 'translateY(27px)';
    toggleSlideOut = false;
  }
  slideOutStyles = 'translateY(27px)';
  toggleSlideOut = false;
  return {
    type: types.EMPTY_VIDEO_SLIDE_OUT,
    payload: {
      slideOutStyles: { style: { transform: slideOutStyles } },
      toggleSlideOut
    }
  };
}
export function getResultStyles(visible) {
  let styles;
  if (!visible) {
    styles = {
      transform: 'translateX(-100%)'
    };
  } else {
    styles = {
      transform: 'translateX(0%)'
    };
  }
  return {
    type: types.GET_RESULT_STYLES,
    payload: styles
  };
}
export function toggleResults(visible) {
  let toggleResults = !visible;
  return {
    type: types.TOGGLE_RESULTS,
    payload: toggleResults
  };
}
export function togglePlaylist(playlistStyle) {
  if (playlistStyle === 'translateY(-100%)') {
    playlistStyle = 'translateY(0%)';
  } else {
    playlistStyle = 'translateY(-100%)';
  }
  return {
    type: types.TOGGLE_PLAYLIST,
    payload: playlistStyle
  };
}
export function handleYouTubeUrl(values) {
  return async dispatch => {
    const url = values['youtube-url'];
    var videoId;
    var videoLink;
    if (!url) {
      return;
    } else if (url.indexOf('player_embedded') !== -1) {
      videoId = url.split('=');
      videoId = videoId[2];
    } else if (url.indexOf('&feature=youtu.be') !== -1) {
      videoLink = url;
      videoId = videoLink.split('=');
      videoId = videoId[1].split('&');
      videoId = videoId[0];
    } else if (url.indexOf('&feature') !== -1) {
      videoLink = url;
      videoId = videoLink.split('/');
      videoId = videoId[4].split('&');
      videoId = videoId[0];
    } else if (url.indexOf('feature') !== -1) {
      videoLink = url;
      videoId = videoLink.split('&');
      videoId = videoId[0].split('/');
      videoId = videoId[4];
      videoId = videoLink.split('&');
      videoId = videoLink[0];
    } else if (url.indexOf('&t') !== -1) {
      videoLink = url;
      videoId = videoLink.split('&t');
      videoId = videoId[0].split('=');
      videoId = videoId[1];
    } else if (url.indexOf('&') !== -1 || url.indexOf('=') !== -1) {
      videoId = url;
      videoId = videoId.split('&')[0];
      videoId = videoId.split('=')[1];
    } else if (url.indexOf('youtu.be') !== -1) {
      videoId = url;
      videoId = url.split('/');
      videoId = videoId[3];
    } else {
      videoId = url;
    }
    dispatch({
      type: types.HANDLE_YOUTUBE_URL,
      payload: videoId
    });
  };
}
// END OF VIDEO ACTION CREATORS

export function getDataObject() {
  return dispatch => {
    const test = axios
      .get('/api/binder')
      .then(resp => {
        dispatch({
          type: types.GET_USER_DATA,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in get user data'
        });
      });
  };
}

export function updateBinderArray() {
  return dispatch => {
    const test = axios
      .get('/api/binder')
      .then(resp => {
        dispatch({
          type: types.UPDATE_BINDER_ARRAY,
          payload: resp.data.binder_arr_obj
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in update binder array'
        });
      });
  };
}

export function updateBinderObj(binder_obj) {
  return {
    type: types.UPDATE_BINDER_OBJ,
    payload: binder_obj
  };
}

export function selectBinder(binderObj) {
  return {
    type: types.SELECT_BINDER,
    payload: binderObj
  };
}

export function selectTab(tabObj) {
  return {
    type: types.SELECT_TAB,
    payload: tabObj
  };
}

export function selectPage(binder_id, tab_id, page_id) {
  let idObject = {
    binder_id: binder_id,
    tab_id: tab_id,
    page_id: page_id
  };
  return {
    type: types.SELECT_PAGE,
    payload: idObject
  };
}

export function addBinder() {
  return dispatch => {
    const test = axios
      .post('/api/binder')
      .then(resp => {
        dispatch({
          type: types.ADD_BINDER,
          payload: resp.data.binder_arr_obj
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in add binder'
        });
      });
  };
}

export function addTab(binder_id) {
  return dispatch => {
    const test = axios
      .post('/api/tab', {
        binderID: binder_id
      })
      .then(resp => {
        dispatch({
          type: types.ADD_TAB,
          payload: resp
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in add tab'
        });
      });
  };
}

export function addPage(binder_id, tab_id) {
  return dispatch => {
    const test = axios
      .post('/api/page', {
        binderID: binder_id,
        tabID: tab_id
      })
      .then(resp => {
        dispatch({
          type: types.ADD_PAGE,
          payload: resp
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in add page'
        });
      });
  };
}

export function deleteBinder(binder_id) {
  return dispatch => {
    const test = axios
      .delete(`/api/binder?binderID=${binder_id}`, {})
      .then(resp => {
        dispatch({
          type: types.DELETE_BINDER,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in delete binder'
        });
      });
  };
}

export function deleteTab(binder_id, tab_id) {
  return dispatch => {
    const test = axios
      .delete(`/api/tab?binderID=${binder_id}&tabID=${tab_id}`, {})
      .then(resp => {
        dispatch({
          type: types.DELETE_TAB,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in delete tab'
        });
      });
  };
}

export function deletePage(binder_id, tab_id, page_id) {
  return dispatch => {
    const test = axios
      .delete(
        `/api/page?binderID=${binder_id}&tabID=${tab_id}&pageID=${page_id}`,
        {}
      )
      .then(resp => {
        dispatch({
          type: types.DELETE_PAGE,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in delete page'
        });
      });
  };
}

export function editBinder(binder_id, binder_name) {
  return dispatch => {
    const test = axios
      .put('/api/binder', {
        binderID: binder_id,
        binder_name: binder_name
      })
      .then(resp => {
        dispatch({
          type: types.EDIT_BINDER,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in edit binder'
        });
      });
  };
}

export function editTab(binder_id, tab_id, tab_name) {
  return dispatch => {
    const test = axios
      .put('/api/tab', {
        binderID: binder_id,
        tabID: tab_id,
        tab_name: tab_name
      })
      .then(resp => {
        dispatch({
          type: types.EDIT_TAB,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in edit tab'
        });
      });
  };
}

export function editPage(binder_id, tab_id, page_id, page_name) {
  return dispatch => {
    const test = axios
      .put('/api/page', {
        binderID: binder_id,
        tabID: tab_id,
        pageID: page_id,
        page_name: page_name
      })
      .then(resp => {
        dispatch({
          type: types.EDIT_PAGE,
          payload: resp.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed call in edit page'
        });
      });
  };
}

export function addLfzBinder(password) {
  return dispatch => {
    const test = axios
      .post('/api/lfz', {
        pw: password
      })
      .then(resp => {
        if (resp.data.hasOwnProperty('success')) {
          console.log('lfz incorrect pw', resp);
          dispatch({
            type: types.LFZ_WRONG_PASSWORD,
            payload: resp.data.success
          });
        }
        dispatch({
          type: types.ADD_LFZ_BINDER,
          payload: resp.data.binder_arr_obj
        });
      })
      .catch(err => {
        dispatch({
          type: types.AXIOS_ERROR,
          msg: 'Failed to add LearningFuze Binder'
        });
      });
  };
}

export function minNav() {
  return {
    type: types.HIDE_NAV
  };
}

export function showNav() {
  return {
    type: types.SHOW_NAV
  };
}

export function editable() {
  return {
    type: types.EDITABLE
  };
}

export function notEditable() {
  return {
    type: types.NOT_EDITABLE
  };
}

export function showLoader() {
  return {
    type: types.SHOW_LOADER
  };
}

export function clearLoader() {
  return {
    type: types.CLEAR_LOADER
  };
}
