import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/EditProfile";
import AddExperience from "./components/dashboard/AddExperience";
import AddEducation from "./components/dashboard/AddEducation";
import Nerds from "./components/profile/Nerds";
import MyProfile from "./components/profile/MyProfile";
import OtherProfile from "./components/profile/OtherProfile";
import Post from "./components/posts/Post";
import MyPosts from "./components/posts/MyPosts";
import store from "./store";
import PrivateRoute from "./routes/PrivateRoute";
import { authenticateUser } from "./actions/authentication";

class App extends Component {
    constructor() {
        super();
        const state = store.getState();
        if (state.authentication.token) {
            store.dispatch(authenticateUser());
        }
    }

    disableContextMenu = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <Fragment>
                <div onContextMenu={this.disableContextMenu}>
                    <Provider store={store}>
                        <Router>
                            <Navbar />
                            <Route exact path="/" component={Landing} />
                            <Switch>
                                <Route exact path="/sign-in" component={SignIn} />
                                <Route exact path="/sign-up" component={SignUp} />
                                <Route exact path="/forgot-password" component={ForgotPassword} />
                                <Route
                                    exact
                                    path="/reset-password/:token"
                                    component={ResetPassword}
                                />
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute
                                    exact
                                    path="/create-profile"
                                    component={CreateProfile}
                                />
                                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                                <PrivateRoute
                                    exact
                                    path="/add-experience"
                                    component={AddExperience}
                                />
                                <PrivateRoute
                                    exact
                                    path="/add-education"
                                    component={AddEducation}
                                />
                                <PrivateRoute exact path="/my-profile" component={MyProfile} />
                                <PrivateRoute exact path="/profile" component={OtherProfile} />
                                <PrivateRoute exact path="/nerds" component={Nerds} />
                                <PrivateRoute exact path="/my-posts" component={MyPosts} />
                                <PrivateRoute exact path="/post" component={Post} />
                            </Switch>
                        </Router>
                    </Provider>
                </div>
            </Fragment>
        );
    }
}

export default App;
