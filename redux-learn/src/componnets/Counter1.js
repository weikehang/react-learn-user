import React from "react";
import {connect} from "../react-redux";
import * as types from "../types/action-types";
import PureComponent from "../componnets/PureComponent";
import _ from "lodash";
class Counter1 extends PureComponent{
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(nextProps, this.props);
    }

    render() {
        console.log('Counter1 render')
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.minus}>-</button>
            </div>
        );
    }
}

let mapStateToProps = (state)=>state;

let mapDispatchToProps = (dispatch,ownProps) => ({
    add(){
        dispatch({type: types.ADD1, payload: ownProps.amount})
    },
    minus() {
        dispatch({types: types.MINUS1});
    }
});
Counter1 = connect(mapStateToProps,mapDispatchToProps)(Counter1);

export default Counter1;

