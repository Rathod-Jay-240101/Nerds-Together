import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class ProfileTopOther extends Component {
    state = {
        loading: false,
    };

    getSocialLinks = () => {
        if (this.props.profile.social) {
            return (
                <Fragment>
                    {this.props.profile.social.youtube ? (
                        <a
                            href={`https://${this.props.profile.social.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}

                    {this.props.profile.social.twitter ? (
                        <a
                            href={`https://${this.props.profile.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}

                    {this.props.profile.social.facebook ? (
                        <a
                            href={`https://${this.props.profile.social.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}

                    {this.props.profile.social.linkedin ? (
                        <a
                            href={`https://${this.props.profile.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}

                    {this.props.profile.social.instagram ? (
                        <a
                            href={`https://${this.props.profile.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}

                    {this.props.profile.social.github ? (
                        <a
                            href={`https://${this.props.profile.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github fa-2x"></i>
                        </a>
                    ) : (
                        <Fragment></Fragment>
                    )}
                </Fragment>
            );
        } else {
            return <Fragment></Fragment>;
        }
    };

    render() {
        return (
            <Fragment>
                <div className="profile-top bg-primary p-2">
                    <div className="avatar-upload">
                        <div className="avatar-preview">
                            <div
                                id="imagePreview"
                                style={{
                                    backgroundImage: `url(${this.props.profile.user.avatar})`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <h1 className="large">
                        {this.props.profile.user.fname + " " + this.props.profile.user.lname}
                    </h1>
                    <p className="lead">{this.props.profile.status}</p>
                    <p>{this.props.profile.location}</p>
                    <div className="icons my-1">
                        {this.getSocialLinks()}
                        {this.props.profile.website ? (
                            <a
                                href={`https://${this.props.profile.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-globe fa-2x"></i>
                            </a>
                        ) : (
                            <Fragment></Fragment>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(null)(ProfileTopOther);
