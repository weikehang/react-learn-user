import React from "react";
import ReactReduxContext from "./context";

export default class Prompt extends React.Component {
    static contextType = ReactReduxContext;

    componentWillUnmount() {
        this.context.history.unblock();
    }

    render() {
        let history = this.context.history;
        let {when, message} = this.props;
        if (when) {
            history.block(message);
        } else {
            history.block(null);
        }
        return null;
    }
};