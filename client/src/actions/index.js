import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

//PANEL SPECs Action Creator

export function setTopLeftHeight(num, interfaceObj) {
    console.log('panel 3 settopleft: ', num / window.innerHeight)
    return (dispatch) => {
        axios.put('/api/page', {
            top_left_panel_height: num,
            binderID: interfaceObj.binder_id,
            tabID: interfaceObj.tab_id,
            pageID: interfaceObj.page_id
        })
            .then((resp) => {
                dispatch({
                    type: types.PANEL_TOP_LEFT_HEIGHT,
                    payload: num
                })
            })
            .catch(error => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed to update Top Left Panel Height'
                })
            });
    }
}

export function setTopLeftWidth(num, interfaceObj) {
    return (dispatch) => {
        axios.put('/api/page', {
            top_left_panel_width: num / window.innerWidth,
            binderID: interfaceObj.binder_id,
            tabID: interfaceObj.tab_id,
            pageID: interfaceObj.page_id
        }).then((resp) => {
            dispatch({
                type: types.PANEL_TOP_LEFT_WIDTH,
                payload: num
            })
        }).catch(error => {
            dispatch({
                type: types.AXIOS_ERROR,
                msg: 'Failed to update Top Left Panel Width'
            })
        });
    }
}

export function setTopRightHeight(num, interfaceObj) {
    return (dispatch) => {
        axios.put('/api/page', {
            top_right_panel_height: num.window.innerHeight,
            binderID: interfaceObj.binder_id,
            tabID: interfaceObj.tab_id,
            pageID: interfaceObj.page_id
        }).then((resp) => {
            dispatch({
                type: types.PANEL_TOP_RIGHT_HEIGHT,
                payload: num
            })
        }).catch(error => {
            dispatch({
                type: types.AXIOS_ERROR,
                msg: 'Failed to update Top Right Panel Height'
            })
        });
    }
}

export function setNumOfPanels(num, interfaceObj) {
    return (dispatch) => {
        axios.put('/api/page', {
            number_of_panels: num,
            binderID: interfaceObj.binder_id,
            tabID: interfaceObj.tab_id,
            pageID: interfaceObj.page_id
        }).then((resp) => {
            dispatch({
                type: types.NUM_OF_PANELS,
                payload: num
            })
        }).catch(error => {
            dispatch({
                type: types.AXIOS_ERROR,
                msg: 'Failed to update Number of Panels'
            })
        });
    }
}

export function getPanelNum(num) {
    return {
        type: types.GET_PANEL_NUM,
        payload: num
    }
}

//Lecture Slides Action Creator

export function setSlidesUrl(slidesURL, interfaceObj) {
    return (dispatch) => {
        axios.put('/api/page', {
            lecture_slides: {
                lec_id: slidesURL
            },
            binderID: interfaceObj.binder_id,
            tabID: interfaceObj.tab_id,
            pageID: interfaceObj.page_id
        }).then((resp) => {
            console.log("setSlidesUrl response: ", resp);
            dispatch({
                type: types.SET_SLIDES_URL,
                payload: slidesURL
            });
        }).catch(error => {
            dispatch({
                type: types.AXIOS_ERROR,
                msg: 'Failed to update Google Slides URL'
            })
        });
    }
}

export function getSlidesURL(slidesURL) {
    return {
        type: types.GET_SLIDES_URL,
        payload: slidesURL
    }
}

export function resetSlidesURL(slidesURL) {
    return {
        type: types.RESET_SLIDES_URL,
        payload: slidesURL
    }
}
// End of Lecture Slides Action Creators

//Video Action Creators
export function toggleModal({ display }) {
    let displayValue = display;
    if (displayValue === 'none') {
        displayValue = 'block';
    } else {
        displayValue = 'none';
    }
    return {
        type: types.TOGGLE_MODAL,
        payload: displayValue
    }
}
export function getVideoResults(videos) {
    return {
        type: types.GET_VIDEO_RESULTS,
        payload: videos
    }
}
export function getResultStyles(styles, bool) {
    if (!bool) {
        styles = {
            transform: 'translateX(100%)'
        }
    } else {
        styles = {
            transform: 'translateX(0%)'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
    return {
        type: types.GET_RESULT_STYLES,
        payload: styles
    }
}
export function getOpacityDisplay(styles, bool) {
    if (!bool) {
        styles = {
            display: 'none'
        }
    } else {
        styles = {
            display: 'block'
        }
    }
    console.log("GET RESULTS STYLES: ", styles);
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
export function addToPlaylist(videoUrl, videoTitle, interfaceObj) {
    if (!videoUrl) {
        return {
            type: types.NO_VIDEO_LINK
        };
    } else if (videoUrl.indexOf("&") !== -1 || videoUrl.indexOf("=") !== -1) {
        let videoLink = videoUrl
        let videoId = videoLink.split('&')[0];
        videoId = videoLink.split('=')[1];
        videoLink = `https://www.youtube.com/embed/${videoId}`;
        return (dispatch) => {
            const videoTest = axios.post('/api/video', {
                video: {
                    videoTitle: '',
                    videoId: videoId,
                    videoUrl: videoLink
                },
                binderID: interfaceObj.binder_id,
                tabID: interfaceObj.tab_id,
                pageID: interfaceObj.page_id
            }).then((response) => {
                console.log("DATA HAS BEEN SENT", response);
                dispatch({
                    type: types.ADD_TO_PLAYLIST,
                    payload: videoLink
                });
            }).catch(error => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Add to Playlist Failed.'
                })
            })
        };
    } else if (videoUrl.indexOf("youtu.be") !== -1) {
        let videoLink = videoUrl;
        let videoId = videoUrl.split("/");
        videoId = videoId[3];
        videoLink = `https://www.youtube.com/embed/${videoId}`;
        return (dispatch) => {
            const videoTest = axios.post('/api/video', {
                video: {
                    videoTitle: '',
                    videoId: videoId,
                    videoUrl: videoLink
                },
                binderID: interfaceObj.binder_id,
                tabID: interfaceObj.tab_id,
                pageID: interfaceObj.page_id
            }).then((response) => {
                console.log("DATA HAS BEEN SENT", response);
                dispatch({
                    type: types.ADD_TO_PLAYLIST,
                    payload: videoLink
                });
            }).catch(error => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Add to Playlist Failed.'
                })
            })
        };
    } else {
        let videoLink = videoUrl;
        let videoId = videoLink.split("/")
        videoId = videoId[3];
        return (dispatch) => {
            const videoTest = axios.post('/api/video', {
                video: {
                    videoTitle: '',
                    videoId: videoId,
                    videoUrl: videoUrl
                },
                binderID: interfaceObj.binder_id,
                tabID: interfaceObj.tab_id,
                pageID: interfaceObj.page_id
            }).then((response) => {
                console.log("DATA HAS BEEN SENT", response);
                dispatch({
                    type: types.ADD_TO_PLAYLIST,
                    payload: videoUrl
                });
            }).catch(error => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Add to Playlist Failed.'
                })
            })
        };
    }
}
export function slideOutVideoSearch(toggleBool, slide) {
    let toggleSlideOut = toggleBool;
    var slideOutStyles;
    if (toggleSlideOut) {
        slideOutStyles = 'translateY(27px)',
            toggleSlideOut = false;
    } else {
        slideOutStyles = 'translateY(-119px)';
        toggleSlideOut = true;
    }
    return {
        type: types.TOGGLE_VIDEO_SLIDE_OUT,
        payload: { slideOutStyles: { transform: slideOutStyles }, toggleSlideOut }
    }
}
export function slideOutSlidesSearch(toggleBool, slide) {
    let toggleSlideOut = toggleBool;
    var slideOutStyles;
    if (toggleSlideOut) {
        slideOutStyles = 'translateY(0px)'
        toggleSlideOut = false;
    } else {
        slideOutStyles = 'translateY(-100px)'
        toggleSlideOut = true;
    }
    return {
        type: types.TOGGLE_SLIDE_OUT_MENU,
        payload: { slideOutStyles: { transform: slideOutStyles }, toggleSlideOut }
    }
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
        payload: { slideOutStyles: { style: { transform: slideOutStyles } }, toggleSlideOut }
    }
}
export function playVideo(url) {
    let videoId = url;
    document.querySelector(".video-iframe").src = url
    return {
        type: types.PLAY_VIDEO,
        payload: { videoId: videoId, resultsContainer: { style: { transform: 'translateY(0px)' } } }
    }
}
export function playPastedLinkVideo(url) {
    if (!url) {
        return {
            type: types.NO_VIDEO_LINK
        };
    } else if (url.indexOf("&") !== -1 || url.indexOf("=") !== -1) {
        let videoId = url
        videoId = videoId.split('&')[0];
        videoId = videoId.split('=')[1];
        videoId = `https://www.youtube.com/embed/${videoId}`;
        console.log("PLAY PASTED LINK VIDEO: ", videoId);
        return {
            type: types.PLAY_PASTED_VIDEO_LINK,
            payload: videoId
        }
    } else if (url.indexOf("youtu.be") !== -1) {
        let videoId = url;
        videoId = url.split("/");
        videoId = videoId[3];
        videoId = `https://www.youtube.com/embed/${videoId}`;
        return {
            type: types.PLAY_PASTED_VIDEO_LINK,
            payload: videoId
        }
    } else {
        let videoId = url
        return {
            type: types.PLAY_PASTED_VIDEO_LINK,
            payload: videoId
        }
    }

}
export function grabVideoUrl(videoLink) {
    return {
        type: types.GRAB_VIDEO_URL,
        payload: videoLink
    }
}
export function setVideoUrl(value, interfaceObj) {
    console.log("VIDEO URL FROM ACTION CREATOR: ", value);
    return {
        type: types.SET_VIDEO_URL,
        payload: value
    }
}
// END OF VIDEO ACTION CREATORS
export function getDataObject() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                console.log("get data object: ", resp.data);

                dispatch({
                    type: types.GET_USER_DATA,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in get user data'
                });
            });
    }
}

export function updateBinderArray() {

    return (dispatch) => {
        const test = axios.get('/api/binder')
            .then((resp) => {
                console.log("update binder array: ", resp.data.binder_arr_obj);

                dispatch({
                    type: types.UPDATE_BINDER_ARRAY,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in update binder array'
                });
            });
    }
}

export function updateBinderObj(binder_obj) {

    return {
        type: types.UPDATE_BINDER_OBJ,
        payload: binder_obj
    }
}

export function selectBinder(binderObj) {
    return {
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function selectTab(tabObj) {
    return {
        type: types.SELECT_TAB,
        payload: tabObj
    }
}

export function selectPage(binder_id, tab_id, page_id) {
    //console.log('select page action idObj:', idObj);
    let idObject = {
        binder_id: binder_id,
        tab_id: tab_id,
        page_id: page_id
    }
    return {
        type: types.SELECT_PAGE,
        payload: idObject
    }
}

export function addBinder() {
    return (dispatch) => {
        const test = axios.post('/api/binder')
            .then((resp) => {
                //console.log("addBinder response: ", resp);
                dispatch({
                    type: types.ADD_BINDER,
                    payload: resp.data.binder_arr_obj
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in add binder'
                });
            });
    }
}

export function addTab(binder_id) {
    return (dispatch) => {
        const test = axios.post('/api/tab', {
            binderID: binder_id
        })
            .then((resp) => {
                //console.log("add tab: ", resp);
                dispatch({
                    type: types.ADD_TAB,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in add tab'
                });
            });
    }
}

export function addPage(binder_id, tab_id) {
    return (dispatch) => {
        const test = axios.post('/api/page', {
            binderID: binder_id,
            tabID: tab_id
        })
            .then((resp) => {
                //console.log("addPage response: ", resp);
                dispatch({
                    type: types.ADD_PAGE,
                    payload: resp
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in add page'
                });
            });
    }
}

export function deleteBinder(binder_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/binder?binderID=${binder_id}`, {
        })
            .then((resp) => {
                console.log("delete binder response: ", resp);

                dispatch({
                    type: types.DELETE_BINDER,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in delete binder'
                });
            });
    }
}

export function deleteTab(binder_id, tab_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/tab?binderID=${binder_id}&tabID=${tab_id}`, {
        })
            .then((resp) => {
                //console.log("delete tab response: ", resp);

                dispatch({
                    type: types.DELETE_TAB,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in delete tab'
                });
            });
    }
}

export function deletePage(binder_id, tab_id, page_id) {
    return (dispatch) => {
        const test = axios.delete(`/api/page?binderID=${binder_id}&tabID=${tab_id}&pageID=${page_id}`, {
        })
            .then((resp) => {
                //console.log("delete page response: ", resp);

                dispatch({
                    type: types.DELETE_PAGE,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in delete page'
                });
            });
    }
}

export function editBinder(binder_id, binder_name) {
    return (dispatch) => {
        const test = axios.put('/api/binder', {
            binderID: binder_id,
            binder_name: binder_name
        })
            .then((resp) => {
                //console.log("edit binder: ", resp);
                dispatch({
                    type: types.EDIT_BINDER,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in edit binder'
                });
            });
    }
}

export function editTab(binder_id, tab_id, tab_name) {
    return (dispatch) => {
        const test = axios.put('/api/tab', {
            binderID: binder_id,
            tabID: tab_id,
            tab_name: tab_name
        })
            .then((resp) => {
                //console.log("edit tab resp: ", resp);
                dispatch({
                    type: types.EDIT_TAB,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in edit tab'
                });
            });
    }
}

export function editPage(binder_id, tab_id, page_id, page_name) {
    return (dispatch) => {
        const test = axios.put('/api/page', {
            binderID: binder_id,
            tabID: tab_id,
            pageID: page_id,
            page_name: page_name
        })
            .then((resp) => {
                console.log("edit page resp: ", resp);
                dispatch({
                    type: types.EDIT_PAGE,
                    payload: resp.data
                });
            }).catch(err => {
                dispatch({
                    type: types.AXIOS_ERROR,
                    msg: 'Failed call in edit page'
                });
            });
    }
}

export function minNav() {
    return {
        type: types.HIDE_NAV
    }
}

export function showNav() {
    return {
        type: types.SHOW_NAV
    }
}

export function editable() {
    return {
        type: types.EDITABLE
    }
}

export function notEditable() {
    return {
        type: types.NOT_EDITABLE
    }
}