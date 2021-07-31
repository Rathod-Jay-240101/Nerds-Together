import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AllPosts from "../posts/AllPosts";

class Landing extends Component {
    getRandomNumber = () => {
        return Math.floor(Math.random() * 4);
    };
    render() {
        if (this.props.isAuthenticated) {
            return <AllPosts />;
        } else {
            return (
                <Fragment>
                    <section className={`landing background${this.getRandomNumber()}`}>
                        <div className="dark-overlay">
                            <div className="landing-inner">
                                <h1 className="x-large">Nerds Together</h1>
                                <p className="lead">
                                    Create A Nerd Profile, Share Your Queries, Questions, Errors And Get Help From Other
                                    Nerds
                                </p>
                                <div className="buttons">
                                    <Link to="/sign-up" className="btn btn-primary">
                                        Sign Up
                                    </Link>
                                    <Link to="sign-in" className="btn btn-light">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
