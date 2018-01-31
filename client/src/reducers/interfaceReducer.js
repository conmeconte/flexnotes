import types from '../actions/types';

const DEFAULT_STATE = {
    binder_id: '',
    tab_id: '',
    page_id: '',
    navbar_min: false,
    editable: false,
    user_name: {},
    pull_from_db: false,
    sent_to_db: false,
    axios_error_response: ''
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_USER_DATA:
            let userName = action.payload.userName;
            let initBinderID = action.payload.binder_arr_obj[0]._id;
            let initTabID = action.payload.binder_arr_obj[0].tab_arr_obj[0]._id;
            let initpageID = action.payload.binder_arr_obj[0].tab_arr_obj[0].page_arr_obj[0]._id;
            return { ...state, user_name: userName, binder_id: initBinderID, tab_id: initTabID, page_id: initpageID };
        case types.SELECT_BINDER:
            let binderID = action.payload._id;
            let tabID = action.payload.tab_arr_obj[0]._id;
            let pageID = action.payload.tab_arr_obj[0].page_arr_obj[0]._id;
            return { ...state, binder_id: binderID, tab_id: tabID, page_id: pageID };
        case types.SELECT_TAB:
            let selectTabID = action.payload._id;
            let firstPageID = action.payload.page_arr_obj[0]._id;
            return { ...state, tab_id: selectTabID, page_id: firstPageID };
        case types.SELECT_PAGE:
            return {...state, binder_id: action.payload.binder_id, tab_id: action.payload.tab_id, page_id: action.payload.page_id };
        case types.ADD_BINDER:
            return { ...state, pull_from_db: true };
        case types.DELETE_BINDER:
            return { ...state, pull_from_db: true };
        case types.ADD_TAB:
            return { ...state, pull_from_db: true };
        case types.DELETE_TAB:
            return { ...state, pull_from_db: true };
        case types.ADD_PAGE:
            return { ...state, pull_from_db: true };
        case types.DELETE_PAGE:
            return { ...state, pull_from_db: true };
        case types.UPDATE_BINDER_ARRAY:
            return { ...state, pull_from_db: false,  sent_to_db: true };
        case types.ADD_TO_PLAYLIST:
        case types.SET_SLIDES_URL:
        case types.PANEL_TOP_LEFT_HEIGHT:
        case types.PANEL_TOP_LEFT_WIDTH:
        case types.PANEL_TOP_RIGHT_HEIGHT:
        case types.NUM_OF_PANELS:
            return { ...state, pull_from_db: true};
        case types.AXIOS_ERROR:
            return { ...state, axios_error_response: action.msg };
        case types.UPDATE_BINDER_OBJ:
            return {...state, sent_to_db: false};
        case types.HIDE_NAV:
            return {...state, navbar_min: true};
        case types.SHOW_NAV:
            return {...state, navbar_min: false};
        case types.EDITABLE:
            return {...state, editable: true};
        case types.NOT_EDITABLE:
            return {...state, editable: false};
        default:
            return state;
    }
}