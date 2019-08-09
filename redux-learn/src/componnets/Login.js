import React from "react";

export default class extends React.Component {
    handleLogin = () => {
        localStorage.setItem("logined", true);
        //这个是重定向过来的 所以会传递过来path state
        //登录成功的时候需要跳转到个人中心
        let from = this.props.location.state && this.props.location.state.from;
        if (from) {
            this.props.history.push(from);
        }else {
            this.props.history.push("/");
        }

    };
    render() {
        return (
            <button className="btn btn-primary" onClick={this.handleLogin}>登录</button>
        );
    }
};