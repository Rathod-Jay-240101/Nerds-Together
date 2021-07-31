import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

class Experience extends Component {
    getDate = (exp) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment>
                {" - "}
                {exp.current ? "Till Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
            </Fragment>
        );
    };

    getExperience = () => {
        return this.props.profile.experience.map((experience) => {
            return (
                <tr key={experience._id}>
                    <td>{experience.company}</td>
                    <td className="hide-sm">{experience.title}</td>
                    <td className="hide-sm">{this.getDate(experience)}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.props.deleteExperience(experience._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <Fragment>
                <h2 className="my-2">Experience Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.getExperience()}</tbody>
                </table>
            </Fragment>
        );
    }
}

export default connect(null, { deleteExperience })(Experience);
