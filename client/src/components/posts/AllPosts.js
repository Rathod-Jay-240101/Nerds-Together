import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loading from "../layout/Loading";
import { likeButtonClicked, setPostData, setPostUser, getAllPosts } from "../../actions/post";
import { fetchOtherProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

class AllPosts extends Component {
    state = {
        allPosts: this.props.allPosts,
        timer: true,
    };

    componentDidMount = () => {
        this.props.getAllPosts();
        setTimeout(() => this.setState({ allPosts: this.props.allPosts }), 3000);
    };

    getDate = (date) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{date}</Moment>
            </Fragment>
        );
    };

    getLikesClassName = (post) => {
        if (post.likes.some((like) => like.user === this.props.user._id)) {
            return "fas fa-thumbs-up fa-lg liked";
        } else {
            return "fas fa-thumbs-up fa-lg";
        }
    };

    refreshPage = () => {
        this.setState({ userPosts: this.props.userPosts });
    };

    getPosts = () => {
        return this.state.allPosts.map((post) => {
            return (
                <Fragment key={post._id}>
                    <div className="post bg-light p-1 my-1">
                        <div>
                            <Link
                                to="/profile"
                                onClick={() => this.props.fetchOtherProfile(post.user._id)}
                            >
                                <img
                                    className="round-img"
                                    src={post.user.avatar}
                                    alt={`${post.user.fname} ${post.user.lname}`}
                                />
                                <h4>
                                    {post.user.fname} {post.user.lname}
                                </h4>
                            </Link>
                        </div>
                        <div>
                            <p
                                className="py-1 post-text"
                                style={{
                                    textAlign: "justify",
                                    fontSize: "1.2rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                {post.text}
                            </p>

                            <button
                                type="button"
                                className="btn btn-primary my-1"
                                onClick={() => this.props.likeButtonClicked(post._id, false)}
                            >
                                <i className={this.getLikesClassName(post)}></i>&nbsp;&nbsp;
                                <span className="count">{post.likes.length}</span>
                            </button>

                            <Link
                                to="/post"
                                className="btn btn-primary my-1"
                                onClick={() => {
                                    this.props.setPostUser(false);
                                    this.props.setPostData(post);
                                }}
                            >
                                Discussion <i className="far fa-comment fa-lg"></i>&nbsp;&nbsp;
                                <span className="count">{post.comments.length}</span>
                            </Link>

                            <p className="post-date">Posted On : {this.getDate(post.date)}</p>
                        </div>
                    </div>
                </Fragment>
            );
        });
    };

    render() {
        setInterval(this.refreshPage, 300);
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
                            <Alert />
                            <h1 className="large text-primary">
                                <i className="fas fa-user"></i> Welcome {this.props.user.fname}{" "}
                                {this.props.user.lname}
                            </h1>
                            <p className="lead">Posts From Other Users...</p>

                            <div className="posts">{this.getPosts()}</div>
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
    user: state.authentication.user,
    allPosts: state.post.allPosts,
    profile: state.profile.profile,
});

export default connect(mapStateToProps, {
    fetchOtherProfile,
    likeButtonClicked,
    setPostData,
    setPostUser,
    getAllPosts,
})(AllPosts);
