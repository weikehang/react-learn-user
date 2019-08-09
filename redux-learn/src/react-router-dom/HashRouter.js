import React from "react";
//这个组件的功能就是监听ptah的变化，然后进行渲染组件
//利用上下文来传递数据给子节点
import ReactRouterContext from "./context";
import {Link} from "./index";
export default class HashRouter extends React.Component {
    //slice从已有的元素中选定 初始化保存pathname这个要用来跟path进行对比
    //state需要给个null取反的时候才可能为true 否则用{}取反还是true
    state = {
        location:{pathname:window.location.hash.slice(1)||"/", state: null}
    };
    constructor(props) {
        super(props);
    }

    //当hash变化的时候，监听到的变化会保存到state 出发render重新通过上下文转入子节点
    listener = () => {
        this.setState({
            location:{
                ...this.state.location,
                pathname: window.location.hash.slice(1),
                state:this.locationState
            }
        });

    };

    componentWillMount() {
        window.addEventListener("hashchange",this.listener);
        //重写hash的值
        window.location.hash = window.location.hash || '/'
    }

    render() {
        //渲染子节点
        //将location转给子组件进行对比然后渲染相应的组件
        let that = this;
        let value = {
            location: this.state.location,
            //history是一个对象，里面有push,block方法
            history:{
                push(to) {
                    //判断是不是需要阻止导航
                    if (that.block) {
                        let allow = window.confirm(that.block(that.state.location));
                        if (!allow) return;
                    }
                    //接收到的path其实就是修改window.hash的值就可以了
                    //如果页面传值以object   to={{pathname:`/user/detail/${item.id}`}}
                    if (typeof to === "object") {
                        //解构
                        let {pathname, state} = to;
                        //将后面的参数存起来 state是link传参数
                        that.locationState = state;
                        window.location.hash = pathname;
                    }else {
                        window.location.hash = to;
                    }
                },
                block(message) {
                    that.block = message;
                },
                unblock() {
                    that.block=null;
                }
            }
        };
        return (
            <ReactRouterContext.Provider value={value}>
                {this.props.children}
            </ReactRouterContext.Provider>
        )

    }

};