import React from "react";
import ReactRouterContext from "./context";
//这个组件主要就是将a标签进行封装
export default class Link extends React.Component {
    static contextType = ReactRouterContext;
    render() {
        //渲染a便签 然后渲染子节点
        //点击时间针对browerRouter  {...this.props}是转过来的props属性，比如className
        return (
            <a {...this.props} href={`#${this.props.to}`} onClick={(event)=>{
                event.preventDefault();
                this.context.history.push(this.props.to)
            }}>
                {this.props.children}
            </a>
        )
    }

};