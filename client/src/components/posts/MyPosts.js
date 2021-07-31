import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Moment from "react-moment";
import Loading from "../layout/Loading";
import {
    submitUserPost,
    likeButtonClicked,
    setPostData,
    deletePost,
    setPostUser,
    getUserPosts,
} from "../../actions/post";
import Alert from "../layout/Alert";

class MyPosts extends Component {
    state = {
        text: "",
        userPosts: this.props.userPosts,
        timer: true,
    };

    componentDidMount = () => {
        this.props.getUserPosts();
        setTimeout(() => this.setState({ userPosts: this.props.userPosts }), 3000);
    };

    getDate = (date) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{date}</Moment>
            </Fragment>
        );
    };

    getLikesClassName = (userPost) => {
        if (userPost.likes.some((like) => like.user === this.props.id)) {
            return "fas fa-thumbs-up fa-lg liked";
        } else {
            return "fas fa-thumbs-up fa-lg";
        }
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.submitUserPosts(this.state.text);
        this.setState({ text: "" });
    };

    refreshPage = () => {
        this.setState({ userPosts: this.props.userPosts });
    };

    getPosts = () => {
        return this.state.userPosts.map((userPost) => {
            return (
                <Fragment key={userPost._id}>
                    <div className="post bg-light p-1 my-1">
                        <div>
                            <Link to="/my-profile">
                                <img
                                    className="round-img"
                                    src={userPost.user.avatar}
                                    alt={`${userPost.user.fname} ${userPost.user.lname}`}
                                />
                                <h4>
                                    {userPost.user.fname} {userPost.user.lname}
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
                                {userPost.text}
                            </p>

                            <button
                                type="button"
                                className="btn btn-primary my-1"
                                onClick={() => this.props.likeButtonClicked(userPost._id, true)}
                            >
                                <i className={this.getLikesClassName(userPost)}></i>{" "}
                                <span className="count">{userPost.likes.length}</span>
                            </button>

                            <Link
                                to="/post"
                                className="btn btn-primary my-1"
                                onClick={() => {
                                    this.props.setPostUser(true);
                                    this.props.setPostData(userPost);
                                }}
                            >
                                Discussion <i className="far fa-comment fa-lg"></i>&nbsp;&nbsp;
                                <span className="count">{userPost.comments.length}</span>
                            </Link>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.props.deletePost(userPost._id)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <p className="post-date">Posted On : {this.getDate(userPost.date)}</p>
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
                            <h1 className="large text-primary">Posts</h1>
                            <p className="lead">
                                <i className="far fa-address-card fa-lg"></i> Welcome To The
                                Community!
                            </p>

                            <div className="post-form">
                                <div className="bg-primary p">
                                    <h3>Say Something...</h3>
                                </div>
                                <form className="form my-1" onSubmit={this.onSubmitHandler}>
                                    <textarea
                                        name="text"
                                        cols="30"
                                        rows="5"
                                        placeholder="Create A Post"
                                        value={this.state.text}
                                        onChange={this.onChangeHandler}
                                        required
                                    ></textarea>
                                    <button type="submit" className="btn btn-primary my-1">
                                        Post &nbsp;<i className="fas fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>

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
    id: state.authentication.user._id,
    userPosts: state.post.userPosts,
    profile: state.profile.profile,
});

export default connect(mapStateToProps, {
    submitUserPosts: submitUserPost,
    likeButtonClicked,
    setPostData,
    deletePost,
    setPostUser,
    getUserPosts,
})(MyPosts);
