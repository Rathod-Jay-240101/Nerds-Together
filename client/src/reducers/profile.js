import * as ActionTypes from "../actions/types";

const initialState = {
    profile: null,
    otherProfile: null,
    profiles: [],
    error: null,
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.GET_PROFILE_SUCCESS:
        case ActionTypes.CREATE_PROFILE_SUCCESS:
        case ActionTypes.UPDATE_PROFILE_SUCCESS:
        case ActionTypes.ADD_EXPERIENCE_SUCCESS:
        case ActionTypes.ADD_EDUCATION_SUCCESS:
        case ActionTypes.DELETE_EXPERIENCE_SUCCESS:
        case ActionTypes.DELETE_EDUCATION_SUCCESS:
            return { ...state, profile: payload };
        case ActionTypes.GET_PROFILE_FAILURE:
        case ActionTypes.CREATE_PROFILE_FAILURE:
        case ActionTypes.UPDATE_PROFILE_FAILURE:
        case ActionTypes.ADD_EXPERIENCE_FAILURE:
        case ActionTypes.ADD_EDUCATION_FAILURE:
        case ActionTypes.DELETE_EXPERIENCE_FAILURE:
        case ActionTypes.DELETE_EDUCATION_FAILURE:
        case ActionTypes.FETCH_OTHER_PROFILE_FAILURE:
            return { ...state, error: payload };
        case ActionTypes.CLEAR_PROFILE:
        case ActionTypes.DELETE_USER:
            return {
                ...state,
                profile: null,
                error: null,
                profiles: [],
                otherProfile: null,
            };
        case ActionTypes.GET_PROFILES_SUCCESS:
            return { ...state, profiles: payload };
        case ActionTypes.GET_PROFILES_FAILURE:
            return { ...state, error: payload };
        case ActionTypes.SET_OTHER_PROFILE:
        case ActionTypes.FETCH_OTHER_PROFILE_SUCCESS:
            return { ...state, otherProfile: payload };
        case ActionTypes.CHANGE_USER_AVATAR:
            return { ...state, profile: { ...state.profile, user: payload } };
        default:
            return state;
    }
};

export default profileReducer;
