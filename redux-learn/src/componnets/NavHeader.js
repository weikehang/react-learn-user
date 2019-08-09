import React from "react";
import {WithRoute} from "../react-router-dom";
//由于NavHeader组件就是一个单纯的组件本身并没有跳转的功能，所以需要使用withRoute来封装
 class NavHeader extends React.Component {
    render() {
        return (
            <div className="navbar-header">
                <a className="navbar-brand" onClick={() => this.props.history.push("/")}>珠峰架构</a>
            </div>
        );
    }
};

export default WithRoute(NavHeader)