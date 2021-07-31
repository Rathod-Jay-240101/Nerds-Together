import React, { Component, Fragment } from "react";
import Moment from "react-moment";

class ProfileExperience extends Component {
    getDate = (exp) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment>
                {" - "}
                {exp.current ? "Till Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
            </Fragment>
        );
    };

    render() {
        return (
            <Fragment>
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>

                    {this.props.profile.experience.map((exp) => {
                        return (
                            <div key={exp._id}>
                                <h3 className="text-dark">{exp.company}</h3>
                                <p>{this.getDate(exp)}</p>
                                <p>
                                    <strong>Position: </strong>
                                    {exp.title}
                                </p>
                                <p>
                                    <strong>Location: </strong>
                                    {exp.location}
                                </p>
                                <p>
                                    <strong>Description: </strong>
                                    {exp.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}
export default ProfileExperience;
