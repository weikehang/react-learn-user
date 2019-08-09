import React from "react";
import {Route,Link} from "../react-router-dom";
import UserAdd from "../componnets/UserAdd";
import UserList from "../componnets/UserList";
import UserDetail from "../componnets/UserDetail";

export default class extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <ul className="nav nav-stacked">
                        <li><Link to="/user/add">添加用户</Link></li>
                        <li><Link to="/user/list">用户列表</Link></li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <Route path="/user/add" component={UserAdd} />
                    <Route path="/user/list" component={UserList} />
                    <Route path="/user/detail/:id" component={UserDetail} />
                </div>
            </div>
        );
    }
};