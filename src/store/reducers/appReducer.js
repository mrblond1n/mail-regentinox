import {SET_NOTIFY} from '../../constants/types';
import {START_LOADING, STOP_LOADING} from '../types';

const INITIAL_STATE = {
    notify: null
};

const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_NOTIFY:
            return {...state, notify: action.notify};
        case START_LOADING:
            return {...state, isLoading: true};
        case STOP_LOADING:
            return {...state, isLoading: false};
        default:
            return state;
    }
};

export default projectReducer;
