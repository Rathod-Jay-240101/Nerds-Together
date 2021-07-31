import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { submitUserComment, deleteComment } from "../../actions/post";
import { fetchOtherProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

class Post extends Component {
    state = {
        text: "",
    };

    getDate = (date) => {
        return (
            <Fragment>
                <Moment format="DD/MM/YYYY">{date}</Moment>
            </Fragment>
        );
    };

    getButton = (userId, commentId) => {
        if (userId === this.props.id) {
            return (
                <Fragment>
                    <button
                        onClick={() =>
                            this.props.deleteComment(this.props.singlePost._id, commentId)
                        }
                        type="button"
                        className="btn btn-danger "
                        style={{
                            marginRight: "0px",
                            float: "right",
                            display: "block",
                        }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </Fragment>
            );
        } else {
            <Fragment></Fragment>;
        }
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.submitUserComment(this.state.text, this.props.singlePost._id);
        this.setState({ text: "" });
    };

    onProfileClickHandler = (id) => {
        this.props.fetchOtherProfile(id);
    };

    refreshPage = () => {
        this.setState({ userPosts: this.props.userPosts });
    };

    getComments = () => {
        return this.props.singlePost.comments.map((comment) => {
            return (
                <Fragment key={comment._id}>
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link
                                to="/profile"
                                onClick={() => this.onProfileClickHandler(comment.user._id)}
                            >
                                <img
                                    className="round-img"
                                    src={comment.user.avatar}
                                    alt={`${comment.user.fname} ${comment.user.lname}`}
                                />
                                <h4>
                                    {comment.user.fname} {comment.user.lname}
                                </h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1 post-text">{comment.text}</p>
                            <p className="post-date">Posted On : {this.getDate(comment.date)}</p>
                            <div className="clear" style={{ clear: "both" }}></div>
                            {this.getButton(comment.user._id, comment._id)}

                            <div className="clear" style={{ clear: "both" }}></div>
                        </div>
                    </div>
                </Fragment>
            );
        });
    };

    render() {
        setInterval(this.refreshPage, 300);
        return (
            <Fragment>
                <section className="container">
                    <Alert />
                    <div className="post bg-light p-1 my-1">
                        <div>
                            <Link
                                to="/profile"
                                onClick={() =>
                                    this.onProfileClickHandler(this.props.singlePost.user._id)
                                }
                            >
                                <img
                                    className="round-img"
                                    src={this.props.singlePost.user.avatar}
                                    alt={`${this.props.singlePost.user.fname} ${this.props.singlePost.user.lname}`}
                                />
                                <h4>
                                    {this.props.singlePost.user.fname}{" "}
                                    {this.props.singlePost.user.lname}
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
                                {this.props.singlePost.text}
                            </p>
                        </div>
                    </div>

                    <div className="post-form">
                        <div className="bg-primary p">
                            <h3>Leave A Comment</h3>
                        </div>
                        <form className="form my-1" onSubmit={this.onSubmitHandler}>
                            <textarea
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="Comment On This Post"
                                value={this.state.text}
                                onChange={this.onChangeHandler}
                                required
                            ></textarea>
                            <input type="submit" className="btn btn-dark my-1" value="Submit" />
                        </form>
                    </div>

                    <div className="comments">{this.getComments()}</div>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    singlePost: state.post.singlePost,
    id: state.authentication.user._id,
});

export default connect(mapStateToProps, { submitUserComment, fetchOtherProfile, deleteComment })(
    Post
);
