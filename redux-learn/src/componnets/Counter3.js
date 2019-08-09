import React from "react";
import {is, Map} from "immutable";
class Counter3 extends React.Component{
    state = {
        counter: Map({number: 0})
    };

    constructor() {
        super();
        this.inputRef = React.createRef();
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Object.keys(nextState).length != Object.keys(this.state).length) {
            return true;
        }

        for (let key in this.state) {
            if (!is(this.state[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }


    add = () => {
        let counter = this.state.counter.update("number", value => value + Number(this.inputRef.current.value));
        this.setState({counter:counter})
    };


    render() {
        console.log('Counter3 render')
        return (
            <div>
                <p>{this.state.counter.get("number")}</p>
                <p><input type="number" ref={this.inputRef} /></p>
                <button onClick={this.add}>+组件三</button>
            </div>
        );
    }
}


export default Counter3;

