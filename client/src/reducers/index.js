import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import resultsReducer from './resultsReducer';


export default combineReducers({
    auth: authReducer,
    video: videoReducer,
    results: resultsReducer 
})