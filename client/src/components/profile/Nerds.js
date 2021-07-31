import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import Loading from "../layout/Loading";
import UserProfiles from "./UserProfiles";
import { getUserProfiles } from "../../actions/profile";

class Nerds extends Component {
    componentDidMount = () => {
        this.props.getUserProfiles();
        setTimeout(() => this.setState({ profiles: this.props.profiles }), 3000);
    };

    state = {
        name: "",
        timer: true,
        profiles: this.props.profiles,
    };

    searchProfile = (name1, name2) => {
        if (name2) {
            const profiles1 = this.props.profiles.filter(
                (profile) =>
                    profile.user.fname.toLowerCase() === name1.toLowerCase() &&
                    profile.user.lname.toLowerCase() === name2.toLowerCase()
            );
            const profiles2 = this.props.profiles.filter(
                (profile) =>
                    profile.user.fname.toLowerCase() === name2.toLowerCase() &&
                    profile.user.lname === name1.toLowerCase()
            );
            const profiles = profiles1.concat(profiles2);
            this.setState({ profiles: profiles });
        } else {
            const profiles1 = this.props.profiles.filter(
                (profile) => profile.user.fname.toLowerCase() === name1.toLowerCase()
            );
            const profiles2 = this.props.profiles.filter(
                (profile) => profile.user.lname.toLowerCase() === name1.toLowerCase()
            );
            const profiles = profiles1.concat(profiles2);
            this.setState({ profiles: profiles });
        }
    };

    onChangeHandler = (event) => {
        const value = event.target.value;
        this.setState({ name: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        let names = this.state.name.split(" ");
        this.searchProfile(names[0], names[1]);
    };

    render() {
        if (this.state.timer) {
            setTimeout(() => this.setState({ timer: false }), 2000);
            return (
                <Fragment>
                    <Loading />
                </Fragment>
            );
        } else {
            if (this.props.profile) {
                return (
                    <Fragment>
                        <section className="container">
                            <form className="search" onSubmit={this.onSubmitHandler}>
                                <input
                                    type="text"
                                    className="search-term"
                                    name="name"
                                    placeholder="Whom Are You Looking For?"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                />
                                <button type="submit" className="search-button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                            <Alert />
                            <h1 className="large text-primary">Nerds</h1>
                            <p className="lead">
                                <i className="fas fa-users fa-lg"></i> Browse And Connect With Other
                                Nerds
                            </p>
                            <UserProfiles profiles={this.state.profiles} />
                        </section>
                    </Fragment>
                );
            } else {
                return <Redirect to="/create-profile" />;
            }
        }
    }
}

const mapStateToProps = (state) => ({
    profiles: state.profile.profiles,
    profile: state.profile.profile,
});

export default connect(mapStateToProps, { getUserProfiles })(Nerds);
