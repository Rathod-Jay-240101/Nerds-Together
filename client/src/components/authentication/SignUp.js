import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerUser } from "../../actions/authentication";
import Alert from "../layout/Alert";

class Register extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        conform_password: "",
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.conform_password) {
            const { fname, lname, email, password } = this.state;
            this.props.registerUser({ fname, lname, email, password });
        } else {
            this.props.setAlert("Password And Conform Password Do Not Match", "danger");
        }
    };

    render() {
        if (this.props.authentication.isAuthenticated) {
            return <Redirect to="/create-profile" />;
        }
        return (
            <Fragment>
                <section className="container">
                    <Alert />
                    <h1 className="large text-primary">Sign Up</h1>
                    <p className="lead">
                        <i className="fas fa-user fa-lg"></i> Create Your Account
                    </p>
                    <form className="form" onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                name="fname"
                                value={this.state.fname}
                                onChange={this.onChangeHandler}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lname"
                                value={this.state.lname}
                                onChange={this.onChangeHandler}
                                required
                            />
                        </div>
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
                                minLength="8"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="conform_password"
                                minLength="8"
                                value={this.state.conform_password}
                                onChange={this.onChangeHandler}
                                required
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Sign Up" />
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to="/sign-in">Sign In</Link>
                    </p>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
