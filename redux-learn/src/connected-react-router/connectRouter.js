//这个函数式一个reducer处理
import * as types from "./constants";
export default function (history) {
    //state的格式
    let initState = {action:history.action,location:history.location};
    return function (state=initState, action) {
        if (action.type === types.LOCATION_CHNAGE) {
            return action.payload;
        }
        return state;
    };
};