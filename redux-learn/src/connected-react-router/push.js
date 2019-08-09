import * as types from "./constants";
//这个方法提供出去给在action重可以使用
export default function (...args) {
    //返回的数据格式将在中间件中被重新包装
    return {
        type:types.CALL_HISTORY_METHOD,
        payload:{
            method:"push",
            args
        }
    }
};