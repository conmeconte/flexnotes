import { combineReducers } from 'redux';
import authReducer from './authReducer';
import binderarrayReducer from './binderArrayReducer';
import binderReducer from './binderReducer';


export default combineReducers({
    auth: authReducer,
    binderArray: binderarrayReducer,
    binder: binderReducer
})