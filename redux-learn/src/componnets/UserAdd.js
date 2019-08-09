import React from "react";
import {WithPrompt,Prompt} from "../react-router-dom";

 class UserAdd extends React.Component {
    state = {isBlock: false};
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();

    }
    handleSubmit = (event) => {
        event.preventDefault();
        let username = this.usernameRef.current.value;
        let user = {id:Date.now(), username};
        let usersStr = localStorage.getItem('users');
        let users = usersStr?JSON.parse(usersStr):[];
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        this.props.history.push('/user/list');
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Prompt
                    when={this.state.isBlock}
                    message={location=>`你确定要跳转到${location.pathname}吗？`}
                />
                <div className="form-group">
                    <label>用户名</label>
                    <input className="form-control" type="text"
                           onChange={event => {
                               this.setState({isBlock:event.target.value.length>0});
                           }}
                           ref={this.usernameRef}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        );
    }
};

export default UserAdd;