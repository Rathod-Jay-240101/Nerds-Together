import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ProfileTopOther from "./ProfileTopOther";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import Alert from "../layout/Alert";
import Loading from "../layout/Loading";

class OtherProfile extends Component {
    render() {
        if (this.props.profile) {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <div className="profile-grid my-1">
                            <ProfileTopOther profile={this.props.profile} />

                            <ProfileAbout profile={this.props.profile} myProfile={false} />

                            <ProfileExperience profile={this.props.profile} />

                            <ProfileEducation profile={this.props.profile} />
                        </div>
                    </section>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Loading />
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.otherProfile,
});

export default connect(mapStateToProps)(OtherProfile);
