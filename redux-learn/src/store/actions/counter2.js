import * as types from "../../types/action-types";
export  default {
    //派发一个异步的动作
    add() {
        return function (dispatch) {
            setTimeout(()=>{
                    dispatch({type:types.ADD2})
            },1000)
        }
    },
    //派发一个promise的动作呢
    minus() {
        return {
            type:types.ADD2,
            payload:new Promise(function (resolve,reject) {
                setTimeout(() => {
                    resolve(5);
                },1000);
            })
        };
    }
}