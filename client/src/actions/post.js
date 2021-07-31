import axios from "axios";
import store from "../store";
import * as ActionTypes from "./types";
import { setAlert } from "./alert";

export const getUserPosts = () => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.get("/api/posts/me", config);
        const userPosts = response.data;
        dispatch({
            type: ActionTypes.GET_USER_POSTS_SUCCESS,
            payload: userPosts,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.GET_USER_POSTS_FAILURE,
            payload: errors,
        });
    }
};

export const getAllPosts = () => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.get("/api/posts", config);
        const allPosts = response.data;
        dispatch({
            type: ActionTypes.GET_ALL_POSTS_SUCCESS,
            payload: allPosts,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.GET_ALL_POSTS_FAILURE,
            payload: errors,
        });
    }
};

export const submitUserPost = (text) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const userPosts = state.post.userPosts;
    const config = {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    };
    const body = {
        text,
    };
    try {
        const response = await axios.post("/api/posts", body, config);
        const userPost = response.data;
        userPosts.unshift(userPost);
        dispatch({
            type: ActionTypes.SUBMIT_USER_POST_SUCCESS,
            payload: userPosts,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.SUBMIT_USER_POST_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const submitUserComment = (text, postId) => async (dispatch) => {
    const state = store.getState();
    const isUserPost = state.post.isUserPost;
    const token = state.authentication.token;
    const userPosts = state.post.userPosts;
    const allPosts = state.post.allPosts;
    const config = {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    };
    const body = {
        text,
    };

    try {
        const response = await axios.put(`/api/posts/comments/${postId}`, body, config);
        const comments = response.data;
        if (isUserPost) {
            const index = userPosts.findIndex((userPost) => userPost._id === postId);
            userPosts[index].comments = comments;
            dispatch({
                type: ActionTypes.SUBMIT_USER_COMMENT_SUCCESS,
                payload: { userPosts, singlePost: userPosts[index], allPosts },
            });
        } else {
            const index = allPosts.findIndex((post) => post._id === postId);
            allPosts[index].comments = comments;
            dispatch({
                type: ActionTypes.SUBMIT_USER_COMMENT_SUCCESS,
                payload: { userPosts, singlePost: allPosts[index], allPosts },
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.SUBMIT_USER_COMMENT_FAILURE,
            payload: errors,
        });
    }
};

export const likeButtonClicked = (postId, isUserPost) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    const userPosts = state.post.userPosts;
    const allPosts = state.post.allPosts;
    const config = {
        headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await axios.put(`/api/posts/likes/${postId}`, null, config);
        const likes = response.data;
        if (isUserPost) {
            const index = userPosts.findIndex((userPost) => userPost._id === postId);
            userPosts[index].likes = likes;
            dispatch({
                type: ActionTypes.LIKES_CHANGED_SUCCESS,
                payload: { userPosts, allPosts },
            });
        } else {
            const index = allPosts.findIndex((post) => post._id === postId);
            allPosts[index].likes = likes;
            dispatch({
                type: ActionTypes.LIKES_CHANGED_SUCCESS,
                payload: { userPosts, allPosts },
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.LIKES_CHANGED_FAILURE,
            payload: errors,
        });
    }
};

export const deletePost = (postId) => async (dispatch) => {
    const state = store.getState();
    const token = state.authentication.token;
    let userPosts = state.post.userPosts;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.delete(`/api/posts/post/${postId}`, config);
        dispatch(setAlert(response.data.msg));
        userPosts = userPosts.filter((userPost) => userPost._id !== postId);
        dispatch({
            type: ActionTypes.DELETE_POST_SUCCESS,
            payload: userPosts,
        });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.DELETE_POST_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
    const state = store.getState();
    const isUserPost = state.post.isUserPost;
    const token = state.authentication.token;
    const userPosts = state.post.userPosts;
    const allPosts = state.post.allPosts;
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };
    try {
        const response = await axios.delete(`/api/posts/comments/${postId}/${commentId}`, config);
        const comments = response.data;
        dispatch(setAlert("Comment Deleted Successfully", "success"));
        if (isUserPost) {
            const index = userPosts.findIndex((userPost) => userPost._id === postId);
            userPosts[index].comments = comments;
            dispatch({
                type: ActionTypes.DELETE_COMMENT_SUCCESS,
                payload: { userPosts, singlePost: userPosts[index], allPosts },
            });
        } else {
            const index = allPosts.findIndex((post) => post._id === postId);
            allPosts[index].comments = comments;
            dispatch({
                type: ActionTypes.DELETE_COMMENT_SUCCESS,
                payload: { userPosts, singlePost: allPosts[index], allPosts },
            });
        }
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({
            type: ActionTypes.DELETE_COMMENT_FAILURE,
            payload: errors,
        });
        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        }
    }
};

export const setPostData = (post) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_POST_DATA,
        payload: post,
    });
};
export const setPostUser = (flag) => (dispatch) => {
    dispatch({
        type: ActionTypes.SET_POST_USER,
        payload: flag,
    });
};

export const clearPosts = () => (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAR_POSTS,
    });
};
