import React from "react";
//这个组件的功能就是监听ptah的变化，然后进行渲染组件
//利用上下文来传递数据给子节点
import ReactRouterContext from "./context";
import {Link} from "./index";

//重写history.pushState方法，这样可以添加自己的逻辑
(function (history) {
    //保存旧的pushState
    let oldPushState = history.pushState;
    //重写history.pushState,将其内存地址指向一个函数，然后在函数内部写自己的逻辑后再执行旧的history
    history.pushState = function (state, title, path) {
        //执行旧的history,history就是当前的实例
        oldPushState.call(history,state, title, path);
        //调用自己定义的函数 保存当前状态
        window.onpushstate && window.onpushstate(state, path);
    }

})(window.history);
export default class BrowserRouter extends React.Component {
    //state需要给个null取反的时候才可能为true 否则用{}取反还是true
    state = {
        location:{pathname:"/", state: null}
    };
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //window.onpopstate 监听后退 前进的历史记录触发
        //window.onpushstate 监听调用history.pushState触发
        window.onpopstate = window.onpushstate = (state, pathname) => {
            //保存当前状态
            this.setState({
                location:{
                    ...this.state.location,
                    pathname,
                    state
                }
            });
        };
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
                        //h5 API history.pushState
                        window.history.pushState(state, "", pathname);
                    }else {
                        window.history.pushState("", "", to);
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