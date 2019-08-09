import React from "react";
import pathToRegexp from "path-to-regexp";
import ReactRouterContext from "./context";
//这个组件的功能就是比配一个路径后就渲染，不会再进行下面的渲染了
export default class Switch extends React.Component {
    //定义上下文对象
    static contextType = ReactRouterContext;
    render() {
       //获取所有的子路由 其实就是组件
        let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        //通过上下文获取pathname路径
        let pathname = this.context.location.pathname;

        //遍历所有的子路由 如果找到比配的路由 直接return结束循环
        for (let i = 0; i < children.length; i++) {
            //通过每个路由 获取path 参数等等
            let child = children[i];
            //通过每个组件的props可以拿到参数
            //这里需要注意的就是 当路由没有比配到的时候 path默认就是"/" 然后路由配置了redirect，如果path也是"/"
            //那么就可以跳转到首页了
            let {path = "/",exact=false,component:Component} = child.props;

            //通过将路径转化为正则比配
            let paramNames = [];
            let regexp = pathToRegexp(path,paramNames,{end: exact});
            //如果遍历过程中 遇到符合比配的一个结果 马上退出循环
            let result = pathname.match(regexp);

            if (result) {
                return child;
            }
        }
        //否则渲染一个空的
        return null;
    }

};