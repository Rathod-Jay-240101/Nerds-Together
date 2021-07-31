import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../actions/authentication";
import Alert from "../layout/Alert";

class Login extends Component {
    state = {
        email: "",
        password: "",
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.loginUser({ email, password });
    };

    render() {
        if (this.props.authentication.isAuthenticated) {
            return <Redirect to={this.props.path} />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Sign In</h1>
                        <p className="lead">
                            <i className="fas fa-user fa-lg"></i> Sign Into Your Account
                        </p>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Sign In" />
                        </form>
                        <p className="my-1">
                            Forgot Your Password? <Link to="/forgot-password">Forgot Password</Link>
                        </p>
                        <p className="my-1">
                            Don't have an account? <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </section>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
    profile: state.profile.profile,
    path: state.path.path,
});

export default connect(mapStateToProps, { loginUser })(Login);
