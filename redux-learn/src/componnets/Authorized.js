import React from "react";
import {Route,Redirect} from "../react-router-dom";
//这个是受保护的路由
export default class Authorized extends React.Component {
    render() {
        let {path, component: Component} = this.props;
        //渲染 Route 参数是render可以进行天骄判断 render是在route里面进行调用，然后转入对应props
        return <Route path={path} render={props=>(
            localStorage.getItem("logined") ? <Component {...props} /> : <Redirect to={{pathname:"/login",state:{form:props.location.pathname}}}/>
        )}/>
    }

};