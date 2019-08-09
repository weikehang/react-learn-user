import React from "react";
//这个是练习高阶组件的使用:特点就是逻辑复用 代码复用
class Form extends React.Component {
    render() {
        return (
            <form>
                <UserName/>
                <PassWord/>
            </form>
        );
    }

}

class UserName extends React.Component {
    render() {
        return (
            <>用户名：<input value={this.props.value} onChange={this.props.handleChange}/></>
        );
    }
}
class PassWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user:{}}
    }
    render() {
        return (
            <>密码：<input value={this.props.value} onChange={this.props.handleChange}/></>
        );
    }
}
UserName = formAjax(UserName);
UserName = formLocal(UserName, "username");
PassWord = formLocal(PassWord, "password");

function formLocal(WrappedComponent,key) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        componentWillMount() {
            this.setState({
                value: JSON.parse(localStorage.getItem("user"))[key]
            });
        }

        handleChange = (e) => {
            let user = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")) || {};
            user[key] = e.target.value;
            this.setState({value:e.target.value});
            localStorage.setItem("user",JSON.stringify(user))
        };

        render() {
            return <WrappedComponent value={this.state.value} handleChange={this.handleChange}/>
        }
    };
}

function formAjax(WrapComponent) {
    return class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {value: ""}
        }

        componentWillMount() {
            let value = this.props.value;
            console.log(value);
            fetch(`/${value}.json/`).then(res=>res.json()).then(result=>{
                this.setState({value:result.value});
            })

        }

        render() {
            return <WrapComponent value={this.state.value}/>
        }
    }
}

export default Form;