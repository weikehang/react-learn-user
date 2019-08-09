import React from "react";
import pathToRegexp from "path-to-regexp";
import ReactRouterContext from "./context";
//这个组件功能就是在path发生改变的时候进行比配，然后渲染匹配的组件
export default class Route extends React.Component {
    //定义上下文对象接收信息
    static contextType = ReactRouterContext;
    render() {
        //接收子组件转入的props
        let {path = "/", exact = false, component: Component, render, children} = this.props;
        //接收上下文转递给的location
        let {location} = this.context;
        let pathname = location.pathname;
        //将path转换为正则，然后通过页面转入的location.pathname进行比对得出结果
        let paramNames = [];
        let regexp = pathToRegexp(path,paramNames,{end:exact});
        //有值说明比配到了
        let result = pathname.match(regexp);
        //组合参数 传给子组件使用 当前组件能够调用history
        let props = {
            location:this.context.location,
            history:this.context.history
        };
        //比配到了就渲染  props是组件拿到history
        if(result){
            //数组解构获取值
            let [url,...values] = result;
            //获取每个参数的属性
            paramNames = paramNames.map(item => item.name);
           //给每个属性添加值 添加到memo
            let params = values.reduce((memo, value, index) => {
                memo[paramNames[index]] = value;
                return memo;
            }, {});
            //构造match对象
            let match = {
                path,
                exact:url === pathname,
                params,
                url:pathname
            };
            //给props添加match属性
            props.match = match;
            //这里需要判断一下 转入的是component render children
            if (Component) {
                return <Component {...props}/>;
            }else if (render) {
                //render他是一个函数，接收参数
                return render(props);
            }else if (children) {
                //render他是一个children，接收参数
                return children(props);
            }
            return <Component {...props}/>;
        }else if (children) {
           return children(props);
        }else {
            return null
        }

    }
};