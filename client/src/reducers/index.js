import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import resultsReducer from './resultsReducer';
import binderarrayReducer from './binderArrayReducer';
import binderReducer from './binderReducer';
import interfaceReducer from './interfaceReducer';



export default combineReducers({
    auth: authReducer,
    video: videoReducer,
    results: resultsReducer, 
    binderArray: binderarrayReducer,
    binder: binderReducer,
    interface: interfaceReducer
})