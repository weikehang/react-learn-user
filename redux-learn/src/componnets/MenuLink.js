import React from "react";
import {Route, Link} from "../react-router-dom";
import './MenuLink.css';
export default class MenuLink extends React.Component {
    render() {
        return (
            <Route exact={this.props.exact} to={this.props.to} children={props=>(
                <Link className={props.match?"active":""} to={this.props.to}>{this.props.children}</Link>
            )}/>
        );
    }

};