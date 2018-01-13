import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

//Lecture Slides Action Creators

export function setSlidesUrl(value) {
    if (value.indexOf('/d/') !== -1) {
        const urlSplit1 = value.split("/d/");
        const urlSplit2 = urlSplit1[1].split('/');
        let presentationID = urlSplit2[0];
        const slidesURL = `https://docs.google.com/presentation/d/${presentationID}/embed`;
        console.log('setSlidesUrl action: ', slidesURL);
        return {
            type: types.SET_SLIDES_URL,
            payload: slidesURL
        }
    }

}
// End of Lecture Slides Action Creators

//Video Action Creators
export function getResultStyles(styles, bool) {
    if (bool) {
        styles = {
            width: '0%',
            display: 'none'
        }
    } else {
        styles = {
            width: '65%',
            display: 'block'
        }
    }
    return {
        type: types.GET_RESULT_STYLES,
        payload: styles
    }
}
export function getOpacityDisplay(styles, bool) {
    if (bool) {
        styles = {
            display: 'none'
        }
    } else {
        styles = {
            display: 'block'
        }
    }
    return {
        type: types.GET_OPACITY_DISPLAY,
        payload: styles
    }
}
export function toggleResults(bool) {
    let toggleResults = !bool
    return {
        type: types.TOGGLE_RESULTS,
        payload: toggleResults
    }
}
export function addToPlaylist(currentVideoList, addedvideo) {
    return {
        type: types.ADD_TO_PLAYLIST,
        payload: [addedVideo, ...currentVideoList]
    }
}
export function playVideo() {
    // Change this link to
    // https://www.youtube.com/embed/Ukg_U3CnJWI
    // this VVVVVVVV
    // https://www.youtube.com/watch?v=Ukg_U3CnJWI&t=1s
    var videoId = document.querySelector(".pastedVideoInput").value;
    videoId = videoId.split('&')[0];
    videoId = videoId.split('=')[1];
    document.querySelector(".currentVideo").src = `https://www.youtube.com/embed/${videoId}`;
    return {
        type: types.PLAY_VIDEO
    }
}


export function grabVideoUrl() {

    return {
        type: types.GRAB_VIDEO_URL,
        payload: videoLink
    }
}

export function binderArray(binderArray) {
    const URL = '/api/binder';
    axios.get(URL).then((resp) => {
        console.log('response is ', resp);
    });

    return {
        type: types.BINDER_ARRAY,
        payload: binderArray
    }
}

export function selectBinder(binderObj) {
    return {
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function binderUpdate(binder_id) {
    return {
        type: types.BINDER_UPDATE,
        payload: binder_id
    }
}

export function tabUpdate(tab_id) {
    return {
        type: types.TAB_UPDATE,
        payload: tab_id
    }
}

export function pageUpdate(page_id) {
    return {
        type: types.PAGE_UPDATE,
        payload: page_id
    }
}

export function addBinder(binderObj) {
    return {
        type: types.ADD_BINDER,
        payload: binderObj
    }
}

