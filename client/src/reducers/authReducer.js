import types from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case types.FETCH_USER:
            console.log("reducer one", action.payload);
            return action.payload || false;
        default:
            return state;
    }
}