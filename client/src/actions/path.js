import * as ActionTypes from "./types";

export const setURLPath = (path) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_URL_PATH,
        payload: path,
    });
};
