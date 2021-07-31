import React, { Component, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setOtherProfile } from "../../actions/profile";

class UserProfiles extends Component {
    getSkills = (profile) => {
        return profile.skills.map((skill) => {
            return (
                <li className="text-primary">
                    <i className="fas fa-check"></i> HTML
                </li>
            );
        });
    };

    getProfiles = () => {
        return this.props.profiles.map((profile) => {
            return (
                <div className="profile bg-light" key={profile._id}>
                    <img className="round-img" src={profile.user.avatar} alt="" />
                    <div>
                        <h2>
                            {profile.user.fname} {profile.user.lname}
                        </h2>
                        <p>{profile.status}</p>
                        <p>{profile.location}</p>
                        <Link
                            to="/profile"
                            className="btn btn-primary"
                            style={{ margin: "10px auto" }}
                            onClick={() => this.props.setOtherProfile(profile)}
                        >
                            View Profile
                        </Link>
                    </div>
                    <ul>
                        {profile.skills.map((skill) => {
                            return (
                                <li className="text-primary" key={uuidv4()}>
                                    <i className="fas fa-check"></i> {skill}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    render() {
        if (this.props.profiles.length > 0) {
            return (
                <Fragment>
                    <div className="profiles">{this.getProfiles()}</div>
                </Fragment>
            );
        } else {
            return <Fragment></Fragment>;
        }
    }
}

export default connect(null, { setOtherProfile })(UserProfiles);
