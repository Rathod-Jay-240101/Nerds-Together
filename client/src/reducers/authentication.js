import * as ActionTypes from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
    errors: null,
};

const authenticationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                token: state.token,
                isAuthenticated: true,
                user: payload,
                errors: null,
            };
        case ActionTypes.REGISTRATION_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: false,
                user: null,
                errors: null,
            };
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: false,
                user: null,
                errors: null,
            };
        case ActionTypes.AUTHENTICATION_FAILURE:
        case ActionTypes.REGISTRATION_FAILURE:
        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.LOGOUT_SUCCESS:
        case ActionTypes.DELETE_USER:
            localStorage.removeItem("token");
            return { ...state, token: null, isAuthenticated: false, user: null, errors: payload };
        case ActionTypes.CHANGE_USER_AVATAR:
            return { ...state, user: payload };
        default:
            return state;
    }
};

export default authenticationReducer;
