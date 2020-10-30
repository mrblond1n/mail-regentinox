import * as types from '../types';

const INITIAL_STATE = {
    notify: null
};

const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_NOTIFY:
            return {...state, notify: action.notify};
        case types.START_LOADING:
            return {...state, isLoading: true};
        case types.STOP_LOADING:
            return {...state, isLoading: false};
        default:
            return state;
    }
};

export default projectReducer;
