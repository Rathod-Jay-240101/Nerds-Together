import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import Experience from "./Experience";
import Education from "./Education";
import { deleteUser } from "../../actions/authentication";

class Dashboard extends Component {
    render() {
        if (this.props.profile.profile) {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Dashboard</h1>
                        <p className="lead">
                            <i className="fas fa-columns fa-lg"></i> Provide Your Personal Details
                            To Share With Others
                        </p>
                        <div className="dash-buttons">
                            <Link to="/edit-profile" className="btn btn-light">
                                <i className="fas fa-user-circle text-primary"></i>
                                &nbsp;&nbsp;&nbsp;Edit Profile
                            </Link>
                            <Link to="/add-experience" className="btn btn-light">
                                <i className="fab fa-black-tie text-primary"></i>
                                &nbsp;&nbsp;&nbsp;Add Experience
                            </Link>
                            <Link to="/add-education" className="btn btn-light">
                                <i className="fas fa-graduation-cap text-primary"></i>
                                &nbsp;&nbsp;Add Education
                            </Link>
                        </div>

                        <Experience profile={this.props.profile.profile} />

                        <Education profile={this.props.profile.profile} />
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={this.props.deleteUser}>
                                <i className="fas fa-user"></i> &nbsp; Delete My Account
                            </button>
                        </div>
                    </section>
                </Fragment>
            );
        } else {
            return (
                <section className="container">
                    <Alert />
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome {this.props.user.fname}{" "}
                        {this.props.user.lname}
                    </p>
                    <p>You Haven't Setup Your Profile, Please Add Some Info About Yourself.</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </section>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.authentication.user,
    profile: state.profile,
});

export default connect(mapStateToProps, { deleteUser })(Dashboard);
