import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Redirect } from "react-router";
import Alert from "../layout/Alert";

class AddExperience extends Component {
    state = {
        title: "",
        company: "",
        location: "",
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

    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.current) {
            const { title, company, location, from, current, description } = this.state;
            this.props.addExperience({ title, company, location, from, current, description });
        } else {
            const { title, company, location, from, to, current, description } = this.state;
            this.props.addExperience({ title, company, location, from, to, current, description });
        }
        this.setState({ redirectToDashboard: true });
    };

    setDisabled = () => {
        if (this.state.current) {
            return "disabled";
        } else {
            return "";
        }
    };

    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to="/dashboard" />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Add An Experience</h1>
                        <p className="lead">
                            <i className="fas fa-code-branch"></i> Add Any Developer / Programming
                            Positions That You Have Had In The Past
                        </p>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
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
                                    Current Job
                                </p>
                            </div>
                            <div className="form-group">
                                <h4>To Date</h4>
                                <input
                                    type="date"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.onChangeHandler}
                                    disabled={this.setDisabled()}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    cols="30"
                                    rows="5"
                                    placeholder="Job Description"
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

export default connect(null, { addExperience })(AddExperience);
