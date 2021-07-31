import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { changeAvatar } from "../../actions/authentication";
import spinner from "../../img/loading.gif";

class ProfileTop extends Component {
    state = {
        loading: false,
    };

    uploadImage = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file, file.name);
        this.props.changeAvatar(formData);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
            window.location.reload();
        }, 6000);
    };

    getBackground = () => {
        if (this.state.loading) {
            return `url(${spinner})`;
        } else {
            return `url(${this.props.profile.user.avatar})`;
        }
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
                        <div className="avatar-edit">
                            <form>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    name="file"
                                    accept=".jpg, .jpeg"
                                    onChange={this.uploadImage}
                                />
                                <label htmlFor="imageUpload"></label>
                            </form>
                        </div>
                        <div className="avatar-preview">
                            <div
                                id="imagePreview"
                                style={{
                                    backgroundImage: this.getBackground(),
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

export default connect(null, { changeAvatar })(ProfileTop);
