import types from '../actions/types';

const DEFAULT_STATE = {
    binder_id: '',
    tab_id: '',
    page_id: '',
    navbar_min: false,
    user_name: {},
    pull_from_db: false,
    sent_to_db: false,
    axios_error_response: ''
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.BINDER_UPDATE:
            return { ...state, binder_id: action.payload };
        case types.TAB_UPDATE:
            return { ...state, tab_id: action.payload };
        case types.PAGE_UPDATE:
            return { ...state, page_id: action.payload };
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
            return {...state, binder_id: binderID, tab_id: tabID, page_id: pageID};
        case types.SELECT_TAB:
            let selectTabID = action.payload._id;
            let firstPageID = action.payload.page_arr_obj[0]._id;
            return {...state, tab_id: selectTabID, page_id: firstPageID };
        case types.SELECT_PAGE:
            return {...state, page_id: action.payload._id };
        case types.ADD_BINDER:
            return {...state, pull_from_db: true};
        case types.DELETE_BINDER:
            return {...state, pull_from_db: true};
        case types.ADD_TAB:
            return {...state, pull_from_db: true};
        case types.DELETE_TAB:
            return {...state, pull_from_db: true};
        case types.ADD_PAGE:
            return {...state, pull_from_db: true};
        case types.DELETE_PAGE:
            return {...state, pull_from_db: true};
        case types.UPDATE_BINDER_ARRAY:
            return {...state, pull_from_db: false};
        case types.ADD_TO_PLAYLIST: 
            return {...state, sent_to_db: true};
        case types.AXIOS_ERROR:
            return {...state, axios_error_response: action.msg};
        default:
            return state;
    }
}