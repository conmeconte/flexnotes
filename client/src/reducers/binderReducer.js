import types from '../actions/types';

const DEFAULT_STATE = {
  binderObj: {}
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.SELECT_BINDER:
      return { binderObj: action.payload };
    case types.GET_USER_DATA:
    case types.FETCH_SAMPLE_USER:
      return { binderObj: action.payload.binder_arr_obj[0] };
    case types.ADD_TAB:
      return { binderObj: action.payload.data };
    case types.ADD_PAGE:
      return { binderObj: action.payload.data };
    case types.DELETE_TAB:
      return { binderObj: action.payload };
    case types.DELETE_PAGE:
      return { binderObj: action.payload };
    case types.UPDATE_BINDER_OBJ:
      return { binderObj: action.payload };
    case types.AUTO_SAVE_NOTES:
    case types.SAVE_NOTES:
      let newBinderObj = state.binderObj;
      if(state.binderObj._id === action.payload.binderID){
        let tabIndex = null;
        let pageIndex = null;
        for (let i = 0; i < state.binderObj.tab_arr_obj.length; i++) {
          if (state.binderObj.tab_arr_obj[i]._id === action.payload.tabID) {
            tabIndex = i;
            break;
          }
        }
        for (let i = 0; i < state.binderObj.tab_arr_obj[tabIndex].page_arr_obj.length; i++) {
          if (state.binderObj.tab_arr_obj[tabIndex].page_arr_obj[i]._id === action.payload.pageID) {
            pageIndex = i;
            break;
          }
        }
        newBinderObj.tab_arr_obj[tabIndex].page_arr_obj[pageIndex].notes = action.payload.notes;
      }

      return{binderObj: newBinderObj};
    default:
      return state;
  }
}
