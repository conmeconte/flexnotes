import types from '../actions/types';

const DEFAULT_STATE = {
    binderArr: []
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.BINDER_ARRAY:
            return{ binderArr: action.payload}
        default:
            return state;
    }
}