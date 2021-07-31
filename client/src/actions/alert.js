import { v4 as uuidv4 } from "uuid";
import * as ActionTypes from "./types";

export const setAlert =
    (message, alertType, timeout = 3000) =>
    (dispatch) => {
        const id = uuidv4();
        dispatch({
            type: ActionTypes.SET_ALERT,
            payload: {
                id,
                alertType,
                message,
            },
        });
        setTimeout(() => removeAlert(id, dispatch), timeout);
    };

const removeAlert = (id, dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_ALERT,
        payload: {
            id,
        },
    });
};
