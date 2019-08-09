//这是reducer2的文件
import { Map } from 'immutable';
import * as types from "../../types/action-types";
let initState = Map({number: 0});

export default function counter2 (state=initState,action) {
    switch (action.type) {
        case types.ADD2:
            return state.update("number",value => value + (action.payload || 1));
            break;
        case types.MINUS2:
            return state.update("number",value => value - 1);
            break;
        default:
            return state;

    }
}