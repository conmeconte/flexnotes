import types from '../actions/types';

const DEFAULT_STATE = {
    binderArr: []
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_USER_DATA:
        return{ binderArr: [...action.payload.binder_arr_obj]}
        case types.UPDATE_BINDER_ARRAY:
            return{ binderArr: [...action.payload]}
        case types.ADD_BINDER:
            return{ binderArr: [...action.payload]}
        case types.DELETE_BINDER:
            return {binderArr: [...action.payload]}
        default:
            return state;
    }
}