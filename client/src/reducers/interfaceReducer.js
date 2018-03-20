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
    save_notes: true,
    axios_error_response: '',
    lfz_response: '',
    show_loader: false
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_USER_DATA:
        case types.FETCH_SAMPLE_USER:
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
        case types.DELETE_BINDER:
        case types.ADD_TAB:
        case types.DELETE_TAB:
        case types.ADD_PAGE:
        case types.DELETE_PAGE:
            return { ...state, pull_from_db: true};
        case types.UPDATE_BINDER_ARRAY:
            return { ...state, pull_from_db: false,  sent_to_db: true};
        case types.ADD_TO_PLAYLIST:
        case types.SET_SLIDES_URL:
        case types.PANEL_TOP_LEFT_HEIGHT:
        case types.PANEL_TOP_LEFT_WIDTH:
        case types.PANEL_TOP_RIGHT_HEIGHT:
        case types.NUM_OF_PANELS:
        case types.SAVE_NOTES:
            return { ...state, pull_from_db: true, show_loader: true };
        case types.AXIOS_ERROR:
            return { ...state, axios_error_response: action.msg };
        case types.HIDE_NAV:
            return {...state, navbar_min: true};
        case types.SHOW_NAV:
            return {...state, navbar_min: false};
        case types.EDITABLE:
            return {...state, editable: true};
        case types.NOT_EDITABLE:
            return {...state, editable: false};
        case types.ADD_LFZ_BINDER:
            return {...state, lfz_response: true};
        case types.LFZ_WRONG_PASSWORD:
            return {...state, lfz_response: false};
        case types.SHOW_LOADER:
            return {...state, show_loader: true};
        case types.CLEAR_LOADER:
            return {...state, sent_to_db: false, show_loader: false};
        default:
            return state;
    }
}