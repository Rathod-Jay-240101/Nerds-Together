import * as ActionTypes from "../actions/types";

const initialState = {
    path: "/",
};

const pathReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SET_URL_PATH:
            return { path: payload };
        default:
            return state;
    }
};
export default pathReducer;
