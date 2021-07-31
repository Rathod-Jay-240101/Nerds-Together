import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Alert from "../layout/Alert";
import { forgotPassword } from "../../actions/authentication";

class ForgotPassword extends Component {
    state = {
        email: "",
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { email } = this.state;
        this.props.forgotPassword(email);
    };

    render() {
        if (this.props.authentication.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Forgot Password</h1>
                        <p className="lead">
                            <i className="fas fa-key fa-lg"></i> Forgot Your Password, Don't Worry
                            Just Enter Your Email ID.
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
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Forgot Password"
                            />
                        </form>
                        <p className="my-1">
                            <Link to="/sign-in">
                                <i className="fas fa-backward"></i>
                                {"  "}Back
                            </Link>
                        </p>
                    </section>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
