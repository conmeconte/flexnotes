import types from '../actions/types';

const DEFAULT_STATE = {
    binderArr: []
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.BINDER_ARRAY:
            return{ binderArr: [...state.binderArr , ...action.payload]}
        case types.ADD_BINDER:
            return{ binderArr: [...state.binderArr, ...action.payload]}
        default:
            return state;
    }
}