import * as types from "./constants"
//这个是一个中间件 主要负责页面的跳转
export default function (history) {
    return function ({getState,dispatch}) {
        return function (next) {
            //dispatch的时候返回这个函数 然后实行这个函数的时候就调用了history.push
            return function (action) {
                if (action.type !== types.CALL_HISTORY_METHOD) {
                    //正常
                    return next(action);
                }
                //其实派发动作主要负责页面的跳转
                //调用history的push方法
                //action是通过dispatch转入进来的
                /*
                *  type:types.CALL_HISTORY_METHOD,
                    payload:{
                        method:"push",
                        args
                    }
                * */
                let {payload: {method, args}} = action;
                history[method](...args)
            };

        };
    }

};