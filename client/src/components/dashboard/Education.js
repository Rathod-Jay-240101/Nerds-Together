import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

class Education extends Component {
    getDate = (edu) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment>
                {" - "}
                {edu.current ? "Till Now" : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
            </Fragment>
        );
    };

    getEducation = () => {
        return this.props.profile.education.map((education) => {
            return (
                <tr key={education._id}>
                    <td>{education.institute}</td>
                    <td className="hide-sm">{education.degree}</td>
                    <td className="hide-sm">{this.getDate(education)}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.props.deleteEducation(education._id)}
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
                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{this.getEducation()}</tbody>
                </table>
            </Fragment>
        );
    }
}

export default connect(null, { deleteEducation })(Education);
