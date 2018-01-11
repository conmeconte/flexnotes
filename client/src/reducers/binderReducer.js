import types from '../actions/types';

const DEFAULT_STATE = {
    binderObj: {}
}

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SELECT_BINDER:
            return{ binderObj: action.payload}
        default:
            return state;
    }
}