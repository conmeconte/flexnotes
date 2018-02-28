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
    default:
      return state;
  }
}
