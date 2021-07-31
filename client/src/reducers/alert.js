import * as ActionTypes from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SET_ALERT:
            return [...state, payload];
        case ActionTypes.REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload.id);
        default:
            return state;
    }
};

export default alertReducer;
