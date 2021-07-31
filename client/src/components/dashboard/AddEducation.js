import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import Alert from "../layout/Alert";

class AddEducation extends Component {
    state = {
        institute: "",
        degree: "",
        field: "",
        from: "",
        to: "",
        current: false,
        description: "",
        redirectToDashboard: false,
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onChangeHandlerAtCheckBox = () => {
        this.setState({ current: !this.state.current });
    };

    setDisabled = () => {
        if (this.state.current) {
            return "disabled";
        } else {
            return "";
        }
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.current) {
            const { institute, degree, field, from, current, description } = this.state;
            this.props.addEducation({ institute, degree, field, from, current, description });
        } else {
            const { institute, degree, field, from, to, current, description } = this.state;
            this.props.addEducation({ institute, degree, field, from, to, current, description });
        }
        this.setState({ redirectToDashboard: true });
    };

    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to="/dashboard" />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Add Your Education</h1>
                        <p className="lead">
                            <i className="fas fa-graduation-cap"></i> Add Any School, Institute,
                            University That You Have Attended
                        </p>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="School, Institute Or University"
                                    name="institute"
                                    value={this.state.institute}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Degree or Certificate"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Field Of Study"
                                    name="field"
                                    value={this.state.field}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h4>From Date</h4>
                                <input
                                    type="date"
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <p>
                                    <input
                                        type="checkbox"
                                        name="current"
                                        onChange={this.onChangeHandlerAtCheckBox}
                                    />{" "}
                                    Current School Or Institute
                                </p>
                            </div>
                            <div className="form-group">
                                <h4>To Date</h4>
                                <input
                                    type="date"
                                    name="to"
                                    disabled={this.setDisabled()}
                                    value={this.state.to}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    cols="30"
                                    rows="5"
                                    placeholder="Program Description"
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                    required
                                ></textarea>
                            </div>
                            <input type="submit" className="btn btn-primary my-1" />
                        </form>
                    </section>
                </Fragment>
            );
        }
    }
}

export default connect(null, { addEducation })(AddEducation);
