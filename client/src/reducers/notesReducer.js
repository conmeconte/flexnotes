import types from '../actions/types';

const DEFAULT_STATE = {document: null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        default:
            return state;
    }
}