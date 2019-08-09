import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom';
import Home from './componnets/Home';
import User from './componnets/User';
import Login from './componnets/Login';
import MenuLink from './componnets/MenuLink';
import Profile from './componnets/Profile';
import NavHeader from './componnets/NavHeader';
import "bootstrap/dist/css/bootstrap.min.css"
import Authorized from "./componnets/Authorized";

ReactDOM.render(
    <Router>
        <>
            <nav className="navbar navbar-inverse">
                <NavHeader/>
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><MenuLink exact={true} to="/">首页</MenuLink></li>
                        <li><MenuLink to="/user">用户管理</MenuLink></li>
                        <li><MenuLink to="/profile">个人中心</MenuLink></li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <Switch>
                            <Route exact={true} path="/" component={Home}/>
                            <Route  path="/user" component={User}/>
                            <Route  path="/login" component={Login}/>
                            <Authorized path="/profile" component={Profile}/>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    </Router>, document.getElementById('root'));
