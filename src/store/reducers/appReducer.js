import { SET_NOTIFY } from "../../constants/types"

const INITIAL_STATE = {
  notify: null
}

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTIFY:
      return { ...state, notify: action.notify }
    default:
      return state
  }
}

export default projectReducer