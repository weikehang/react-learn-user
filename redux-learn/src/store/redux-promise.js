//判断是不是一个promise
function isPromise(obj) {
    return !!obj&&(typeof obj ==='object' || typeof obj ==='function')&&typeof obj.then == 'function';
}

export default function ({getState, dispatch}) {
    return (next) => {
        return (action) => {
            //先判断action.payload是不是一个promise对象
            //如果是就执行then方法，然后在里面派发动作
            return isPromise(action.payload) ? action.payload.then( (res)=> {
                dispatch({...action, payload: res});
            }).catch(err => {
                dispatch({...action, payload: err, error: true});
                return Promise.reject(err);
            }) : next(action)
        };
    };

};