import React from "react";
import {Route,Link} from "../react-router-dom";

export default class extends React.Component {
    state = {users: []};
    componentDidMount() {
        let usersStr = localStorage.getItem("users");
        let users = usersStr ? JSON.parse(usersStr) : [];
        this.setState({users})
    }

    render() {
        //将所有的用户显示出来
        return (
            <ul className="list-group">
                {
                    this.state.users.map(item=>(
                        <li className="list-group-item" key={item.id}>
                            <Link to={{pathname:`/user/detail/${item.id}`,state:item}}>{item.username}</Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
};