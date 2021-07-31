import axios from "axios";
import store from "../store";
import { setAlert } from "./alert";
import * as ActionTypes from "./types";

export const getUserProfile = () => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.get("/api/profiles/me", config);
        const profile = response.data;
        dispatch({
            type: ActionTypes.GET_PROFILE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.GET_PROFILE_FAILURE,
            payload: errors,
        });
    }
};

export const getUserProfiles = () => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.get("/api/profiles", config);
        const profiles = response.data;
        dispatch({
            type: ActionTypes.GET_PROFILES_SUCCESS,
            payload: profiles,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.GET_PROFILES_FAILURE,
            payload: errors,
        });
    }
};

export const createUserProfile = (profile) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    const body = profile;
    try {
        const response = await axios.post("/api/profiles", body, config);
        dispatch(setAlert("Profile Created Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.CREATE_PROFILE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.CREATE_PROFILE_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const updateUserProfile = (profile) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    const body = profile;
    try {
        const response = await axios.post("/api/profiles", body, config);
        dispatch(setAlert("Profile Updated Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.UPDATE_PROFILE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.UPDATE_PROFILE_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const addExperience = (experience) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };
    const body = experience;
    try {
        const response = await axios.put("/api/profiles/experience", body, config);
        dispatch(setAlert("Experience Added Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.ADD_EXPERIENCE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.ADD_EXPERIENCE_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const deleteExperience = (id) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.delete(`/api/profiles/experience/${id}`, config);
        dispatch(setAlert("Experience Deleted Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.DELETE_EXPERIENCE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.DELETE_EXPERIENCE_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const addEducation = (education) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
    };
    const body = education;
    try {
        const response = await axios.put("/api/profiles/education", body, config);
        dispatch(setAlert("Education Added Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.ADD_EDUCATION_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.ADD_EDUCATION_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const deleteEducation = (id) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.delete(`/api/profiles/education/${id}`, config);
        dispatch(setAlert("Education Deleted Successfully", "success"));
        const profile = response.data;
        dispatch({
            type: ActionTypes.DELETE_EDUCATION_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.DELETE_EDUCATION_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const clearUserProfile = () => (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAR_PROFILE,
    });
};

export const setOtherProfile = (profile) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_OTHER_PROFILE,
        payload: profile,
    });
};

export const fetchOtherProfile = (id) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.get(`/api/profiles/user/${id}`, config);
        const profile = response.data;
        dispatch({
            type: ActionTypes.FETCH_OTHER_PROFILE_SUCCESS,
            payload: profile,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.FETCH_OTHER_PROFILE_FAILURE,
            payload: errors,
        });
    }
};
