import React from "react";

export default class extends React.Component {
    state = {user: {}};
    componentDidMount() {
        //获取传递过来的参数
        let user = this.props.location.state;
        if (!user) {
            let usersStr = localStorage.getItem("users");
            let users = usersStr ? JSON.parse(usersStr) : [];
            let id = this.props.match.params.id;
            user = users.find(user => user.id === parseInt(id));
        }
        this.setState({user})

    }

    render() {
        let {user} = this.state;
        return (
            <div>
                <p>用户ID:{user.id}</p>
                <p>用户名:{user.username}</p>
            </div>
        );
    }
};