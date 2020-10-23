import { ADD_PRODUCT, EDIT_PRODUCT } from "../types";

const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return state
    case EDIT_PRODUCT:
    default:
      return state
  }
}

export default projectReducer