import isEmpty from '../validation/is_empty';
import { SET_CURRENT_USER, FETCH_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case FETCH_USER:
            return {
                user: action.payload || null,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default authReducer;
