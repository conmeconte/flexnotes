import types from '../actions/types';

const DEFAULT_STATE = {
    topLeftHeight: 0,
    topLeftWidth: 0,
    topRightHeight: 0,
    numberPanels: 3
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.NUM_OF_PANELS:
            return { ...state, numberPanels: action.payload }
        case types.PANEL_TOP_LEFT_HEIGHT:
            return { ...state, topLeftHeight: action.payload }
        case types.PANEL_TOP_LEFT_WIDTH:
            return { ...state, topLeftWidth: action.payload }
        case types.PANEL_TOP_RIGHT_HEIGHT:
            return { ...state, topRightHeight: action.payload }
        default:
            return state;
    }
}