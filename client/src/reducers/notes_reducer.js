import types from '../actions/types';

const DEFAULT_STATE = { document: {} };

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SAVE_NOTES:
            return {document: action.payload};
        default:
            return state;
    }
}