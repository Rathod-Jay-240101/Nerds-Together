import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authentication";

class Navbar extends Component {
    navbarBeforeAuthentication = () => {
        return (
            <Fragment>
                <Helmet>
                    <title>Welcome To Nerds Together</title>
                </Helmet>
                <nav className="navbar bg-dark">
                    <h1>
                        <Link to="/">
                            <i className="fas fa-laptop-code"></i> Nerds Together
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/sign-up">
                                &nbsp;&nbsp;
                                <i className="fas fa-user-plus fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-in">
                                &nbsp;&nbsp;
                                <i className="fas fa-sign-in-alt fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        );
    };

    navbarAfterAuthentication = () => {
        return (
            <Fragment>
                <Helmet>
                    <title>
                        Welcome {this.props.authentication.user.fname}{" "}
                        {this.props.authentication.user.lname}
                    </title>
                </Helmet>
                <nav className="navbar bg-dark">
                    <h1>
                        <Link to="/">
                            <i className="fas fa-laptop-code fa-lg"></i> Nerds Together
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/my-posts">
                                &nbsp;&nbsp;
                                <i className="far fa-address-card fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-profile">
                                &nbsp;&nbsp;
                                <i className="fas fa-user-circle fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to="/nerds">
                                &nbsp;&nbsp;
                                <i className="fas fa-users fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-in" onClick={this.props.logoutUser}>
                                &nbsp;&nbsp;
                                <i className="fas fa-sign-out-alt fa-lg"></i>
                                &nbsp;&nbsp;
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        );
    };

    render() {
        if (this.props.authentication.isAuthenticated) {
            return this.navbarAfterAuthentication();
        } else {
            return this.navbarBeforeAuthentication();
        }
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
