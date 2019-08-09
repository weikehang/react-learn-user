import React from "react";
import {connect} from "react-redux";
import actions from "../store/actions/counter";

class Counter4 extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={()=>this.props.go('/')}>跳到首页去</button>
            </div>
        )
    }

};
export default connect(state => state.counter, actions)(Counter4);