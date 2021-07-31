import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import Loading from "../layout/Loading";
import Alert from "../layout/Alert";
import { Redirect } from "react-router";

class MyProfile extends Component {
    state = {
        timer: true,
    };
    render() {
        if (this.state.timer) {
            setTimeout(() => this.setState({ timer: false }), 2000);
            return (
                <Fragment>
                    <Loading />
                </Fragment>
            );
        } else {
            if (this.props.profile) {
                return (
                    <Fragment>
                        <section className="container">
                            <Alert />
                            <div className="profile-grid my-1">
                                <ProfileTop profile={this.props.profile} />

                                <ProfileAbout
                                    profile={this.props.profile}
                                    token={this.props.token}
                                    myProfile={true}
                                />

                                <ProfileExperience profile={this.props.profile} />

                                <ProfileEducation profile={this.props.profile} />
                            </div>
                        </section>
                    </Fragment>
                );
            } else {
                return <Redirect to="/create-profile" />;
            }
        }
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
    token: state.authentication.token,
});

export default connect(mapStateToProps)(MyProfile);
