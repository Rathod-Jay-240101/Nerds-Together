import React, { Component, Fragment } from "react";
import spinner from "../../img/loading.gif";

class Loading extends Component {
    render() {
        return (
            <Fragment>
                <img
                    src={spinner}
                    alt="loading..."
                    style={{ width: "100px", margin: "150px auto", display: "block" }}
                />
            </Fragment>
        );
    }
}

export default Loading;
