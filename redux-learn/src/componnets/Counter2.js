import React from "react";
import {connect} from "../react-redux";
import actions from "../store/actions/counter2";
import PureComponent from "../componnets/PureComponent";

class Counter2 extends PureComponent{
    constructor() {
        super();
    }

    render() {
        console.log("Counter2 render")
        console.log(this.props)
        return (
            <div style={{border: "1px solid green"}}>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.minus}>-</button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {number:state.counter2.get("number")};
};

export default connect(mapStateToProps,actions)(Counter2);

