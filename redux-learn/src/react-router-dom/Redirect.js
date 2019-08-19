import React from "react";
import ReactRouterContext from "./context";
//这个功能就是对url进行重定向跳转
export default class Redirect extends React.Component {
    //定义上下文对象
    static contextType = ReactRouterContext;
    componentWillMount() {
        //直接调用history.push调转
        if (!this.props.from || this.props.from === this.context.location.pathname) {
            this.context.history.push(this.props.to);
        }
    }

    render() {git
        //不渲染
        return null;
    }

};