import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setURLPath } from "../actions/path";

class PrivateRoute extends Component {
    render() {
        if (this.props.authentication.isAuthenticated) {
            return <Route exact path={this.props.path} component={this.props.component} />;
        } else {
            if (
                this.props.path === "/my-profile" ||
                this.props.path === "/nerds" ||
                this.props.path === "/my-posts"
            ) {
                this.props.setURLPath(this.props.path);
            } else {
                this.props.setURLPath("/");
            }
            return <Redirect to="/sign-in" />;
        }
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { setURLPath })(PrivateRoute);
