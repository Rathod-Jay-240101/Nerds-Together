import React, { Component, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

class ProfileAbout extends Component {
    getButtons = () => {
        if (this.props.myProfile) {
            return (
                <Fragment>
                    <div className="line"></div>
                    <Link to="/dashboard" className="btn btn-primary btn-profile">
                        Edit Profile
                    </Link>
                    <Link
                        to={`/reset-password/${this.props.token}`}
                        className="btn btn-primary btn-profile"
                    >
                        Change Password
                    </Link>
                </Fragment>
            );
        } else {
            return <Fragment></Fragment>;
        }
    };
    render() {
        return (
            <Fragment>
                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{this.props.profile.user.fname}'s Bio</h2>
                    <p>{this.props.profile.bio}</p>
                    <div className="line"></div>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">
                        {this.props.profile.skills.map((skill) => {
                            return (
                                <div className="p-1" key={uuidv4()}>
                                    <i className="fa fa-check"></i> {skill}
                                </div>
                            );
                        })}
                    </div>
                    {this.getButtons()}
                </div>
            </Fragment>
        );
    }
}

export default ProfileAbout;
