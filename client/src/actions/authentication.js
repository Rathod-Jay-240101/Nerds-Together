import axios from "axios";
import store from "../store";
import * as ActionTypes from "./types";
import { setAlert } from "./alert";
import { clearUserProfile, getUserProfile, getUserProfiles } from "./profile";
import { clearPosts, getUserPosts, getAllPosts } from "./post";

export const authenticateUser = () => async (dispatch) => {
    const state = store.getState();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": state.authentication.token,
        },
    };
    try {
        const response = await axios.get("/api/authentication", config);
        const user = response.data;
        dispatch({
            type: ActionTypes.AUTHENTICATION_SUCCESS,
            payload: user,
        });
        dispatch(getUserProfile());
        dispatch(getAllPosts());
        dispatch(getUserPosts());
        dispatch(getUserProfiles());
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.AUTHENTICATION_FAILURE,
            payload: errors,
        });
    }
};

export const registerUser = (credentials) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = credentials;
    try {
        const response = await axios.post("/api/users/", body, config);
        dispatch(setAlert("Successfully Signed Up", "success"));
        dispatch({
            type: ActionTypes.REGISTRATION_SUCCESS,
            payload: response.data,
        });
        dispatch(authenticateUser());
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.REGISTRATION_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const loginUser = (credentials) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = credentials;
    try {
        const response = await axios.post("/api/authentication/", body, config);
        dispatch(setAlert("Successfully Signed In", "success"));
        dispatch({
            type: ActionTypes.LOGIN_SUCCESS,
            payload: response.data,
        });
        dispatch(authenticateUser());
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.LOGIN_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(clearUserProfile());
    dispatch(clearPosts());
    dispatch({
        type: ActionTypes.LOGOUT_SUCCESS,
    });
};

export const forgotPassword = (email) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = { email };
    try {
        const response = await axios.post("/api/authentication/forgot-password", body, config);
        dispatch(setAlert(response.data.msg, "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const resetPassword = (password, token) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };
    const body = { password };
    try {
        const response = await axios.post("/api/authentication/reset-password", body, config);
        dispatch(setAlert(response.data.msg, "success"));
        dispatch(logoutUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const changeAvatar = (formData) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
            "content-type": "multipart/form-data",
        },
    };
    try {
        const response = await axios.post("/api/authentication/avatars", formData, config);
        const user = response.data;
        dispatch({
            type: ActionTypes.CHANGE_USER_AVATAR,
            payload: user,
        });
        setTimeout(() => {
            dispatch(setAlert("Avatar Updated Successfully", "success"));
        }, 6000);
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const deleteUser = () => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.delete("/api/users", config);
        const msg = response.data.msg;
        dispatch(setAlert(msg, "success"));
        dispatch({
            type: ActionTypes.DELETE_USER,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};
