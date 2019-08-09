export default function ({getState,dispatch}) {
    return function (next) {
        return function (action) {
            //此时转入的action如果是函数呢，其实他就一个异步的操作
            if (typeof action === "function") {
                //此时需要执行一下action,参数就是dispatch
                return action(next)
            }else {
                //如果是dispatch过来的action是一个对象，其实就是正常的操作
                //直接组装成dispatch(action)就可以了
                next(action)
            }
        };
    };
}