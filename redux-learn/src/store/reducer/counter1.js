//这是reducer1的文件
import * as types from "../../types/action-types";
let initState = {number: 0};
export default function counter1(state=initState,action) {
    switch (action.type) {
        case types.ADD1:
            return {number: state.number + (action.payload || 1)};
            break;
        case types.MINUS1:
            return {number: state.number - 1};
            break;
        default:
            return state;
    }
}