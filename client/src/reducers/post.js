import * as ActionTypes from "../actions/types";

const initialState = {
    userPosts: [],
    errors: null,
    singlePost: null,
    allPosts: [],
    isUserPost: null,
};

const postsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.GET_ALL_POSTS_SUCCESS:
            return { ...state, allPosts: payload };
        case ActionTypes.GET_USER_POSTS_SUCCESS:
        case ActionTypes.SUBMIT_USER_POST_SUCCESS:
        case ActionTypes.DELETE_POST_SUCCESS:
            return { ...state, userPosts: payload };
        case ActionTypes.SUBMIT_USER_COMMENT_SUCCESS:
        case ActionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                userPosts: payload.userPosts,
                singlePost: payload.singlePost,
                allPosts: payload.allPosts,
            };
        case ActionTypes.LIKES_CHANGED_SUCCESS:
            return { ...state, userPosts: payload.userPosts, allPosts: payload.allPosts };
        case ActionTypes.GET_USER_POSTS_FAILURE:
        case ActionTypes.GET_ALL_POSTS_FAILURE:
        case ActionTypes.SUBMIT_USER_POST_FAILURE:
        case ActionTypes.SUBMIT_USER_COMMENT_FAILURE:
        case ActionTypes.LIKES_CHANGED_FAILURE:
        case ActionTypes.DELETE_POST_FAILURE:
        case ActionTypes.DELETE_COMMENT_FAILURE:
            return { ...state, errors: payload };
        case ActionTypes.SET_POST_DATA:
            return { ...state, singlePost: payload };
        case ActionTypes.SET_POST_USER:
            return { ...state, isUserPost: payload };
        case ActionTypes.CLEAR_POSTS:
        case ActionTypes.DELETE_USER:
            return {
                userPosts: [],
                errors: null,
                singlePost: null,
                allPosts: [],
            };
        default:
            return state;
    }
};

export default postsReducer;
