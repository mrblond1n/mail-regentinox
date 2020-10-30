import * as types from '../types';

const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_PRODUCT:
            return state;
        case types.EDIT_PRODUCT:
        default:
            return state;
    }
};

export default projectReducer;
