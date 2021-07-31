import React, { Component, Fragment } from "react";
import Moment from "react-moment";

class ProfileEducation extends Component {
    getDate = (edu) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                {" - "}
                {edu.current ? "Till Now" : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
            </Fragment>
        );
    };

    render() {
        return (
            <Fragment>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {this.props.profile.education.map((edu) => {
                        return (
                            <div key={edu._id}>
                                <h3>{edu.institute}</h3>
                                <p>{this.getDate(edu)}</p>
                                <p>
                                    <strong>Degree: </strong>
                                    {edu.degree}
                                </p>
                                <p>
                                    <strong>Field Of Study: </strong>
                                    {edu.field}
                                </p>
                                <p>
                                    <strong>Description: </strong>
                                    {edu.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}
export default ProfileEducation;
