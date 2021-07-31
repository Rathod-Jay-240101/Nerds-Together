import { combineReducers } from "redux";
import alertReducer from "./alert";
import authenticationReducer from "./authentication";
import profileReducer from "./profile";
import pathReducer from "./path";
import postsReducer from "./post";

export default combineReducers({
    alerts: alertReducer,
    authentication: authenticationReducer,
    profile: profileReducer,
    path: pathReducer,
    post: postsReducer,
});
