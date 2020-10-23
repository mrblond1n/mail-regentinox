import {SET_NOTIFY} from '../../constants/types';
import {START_LOADING, STOP_LOADING} from '../types';

export const setNotify = (notify = null) => dispatch =>
    dispatch({type: SET_NOTIFY, notify});

export const setStartLoading = () => dispatch => dispatch({type: START_LOADING});
export const setStopLoading = () => dispatch => dispatch({type: STOP_LOADING});
