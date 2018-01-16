import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import resultsReducer from './resultsReducer';
import binderarrayReducer from './binderArrayReducer';
import binderReducer from './binderReducer';
import interfaceReducer from './interfaceReducer';
import slideReducer from './slide_reducer';
import notesReducer from './notesReducer';
import panelSpecReducer from './panel_spec_reducer';



export default combineReducers({
    auth: authReducer,
    video: videoReducer,
    videoResults: resultsReducer,
    binderArray: binderarrayReducer,
    binder: binderReducer,
    interface: interfaceReducer,
    slides: slideReducer,
    notes: notesReducer,
    form: formReducer,
    panelSpecs: panelSpecReducer
})