import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { resetPassword } from "../../actions/authentication";
import { setAlert } from "../../actions/alert";

class ResetPassword extends Component {
    state = {
        password: "",
        confirm_password: "",
        redirectToSignIn: false,
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.confirm_password) {
            const { password } = this.state;
            this.props.resetPassword(password, this.props.match.params.token);
            setTimeout(() => this.setState({ redirectToSignIn: true }), 3000);
        } else {
            this.props.setAlert("Password And Conform Password Do Not Match", "danger");
        }
    };

    render() {
        if (this.state.redirectToSignIn) {
            return <Redirect to="/sign-in" />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Reset Password</h1>
                        <p className="lead">
                            <i className="fas fa-key fa-lg"></i> Provide Your New Password
                        </p>
                        <form className="form" onSubmit={this.onSubmitHandler}>
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
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirm_password"
                                    value={this.state.confirm_password}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Reset Password"
                            />
                        </form>
                    </section>
                </Fragment>
            );
        }
    }
}

export default connect(null, { resetPassword, setAlert })(ResetPassword);
