import React from "react";
import {ReactReduxContext} from "react-redux";
import {Router} from "react-router";
import * as types from "./constants";
//这个组件主要是将转入history转入router,启用history模式
export default class ConnectedRouter extends React.Component {
    //获取redux上下文对象
    static contextType = ReactReduxContext;
   componentDidMount() {
       //监听地址栏的变化后派发动作
       this.unlisten = this.props.history.listen((location,action)=>{
           this.context.store.dispatch({
               type:types.LOCATION_CHNAGE,
               payload:{location, action}
           });
       })
   }

   componentWillUnmount() {
       this.unlisten();
   }

    render() {
       return (
           <Router history={this.props.history}>
               {this.props.children}
           </Router>
       )
   }
};