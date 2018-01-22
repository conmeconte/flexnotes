import types from '../actions/types';

const DEFAULT_STATE = {
    binderObj: {}
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SELECT_BINDER:
            return{ binderObj: action.payload};
        case types.GET_USER_DATA:
            return {binderObj: action.payload.binder_arr_obj[0]};
        case types.ADD_TAB:
            return {binderObj: action.payload.data};
        case types.ADD_PAGE:
            return {binderObj: action.payload.data};
        case types.DELETE_TAB:
            return {binderObj: action.payload};
        case types.DELETE_PAGE:
            return {binderObj: action.payload};
        case types.UPDATE_BINDER_OBJ:
            return {binderObj: action.payload}
        // case types.EDIT_TAB:
        // console.log('binderreducer for edit tab: ',action.payload);
        //     return {binderObj: action.payload};
        default:
            return state;
    }
}