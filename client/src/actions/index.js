import axios from 'axios';
import types from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: types.FETCH_USER, payload: res.data });
};

export function binderArray(binderArray){
    return{
        type: types.BINDER_ARRAY,
        payload: binderArray
    }
}

export function selectBinder(binderObj){
    return{
        type: types.SELECT_BINDER,
        payload: binderObj
    }
}

export function binderUpdate(binder_id){
    return{
        type: types.BINDER_UPDATE,
        payload: binder_id
    }
}

export function tabUpdate(tab_id){
    return{
        type: types.TAB_UPDATE,
        payload: tab_id
    }
}

export function pageUpdate(page_id){
    return{
        type: types.PAGE_UPDATE,
        payload: page_id
    }
}