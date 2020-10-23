import {SET_NOTIFY} from '../../constants/types'

export const setNotify = (notify = null) => dispatch =>
	dispatch({type: SET_NOTIFY, notify})
