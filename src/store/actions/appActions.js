import * as types from '../types';

export const setNotify = notify => dispatch => dispatch({type: types.SET_NOTIFY, notify});
export const setStartLoading = () => dispatch => dispatch({type: types.START_LOADING});
export const setStopLoading = () => dispatch => dispatch({type: types.STOP_LOADING});
