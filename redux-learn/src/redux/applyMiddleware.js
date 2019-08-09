//这个方法主要是先处理中间件，在执行dispatch；原理就是对dispatch进行重写，先执行
//自定义的dispatch，然后在执行真正的dispatch
//middleware是中间件 如果是多个中间件的时候，需要遍历每一个中间件
import compose from "../redux/compose"
export default function applyMiddleware(...middlewares) {
    //createStore是转入
    return (createStore)=>{
        //arg是reducer
        return (reducer) => {
            //获取store
            let store = createStore(reducer);
            //重写dispatch
            let dispatch;
            //执行middleware 格式{getState,dispatch}
            let middlewareAPI = {
                getState:store.getState,//获取创库中的状态
                dispatch: (...arg) => dispatch(...arg) //派发动作
            };

            //遍历中间件 然后执行每一个中间件
            //middlewareAPI传入这个api是因为每个中间件都需要用到这两个参数
            const chain = middlewares.map(middleware=>middleware(middlewareAPI));
            console.log(chain)
            //这里得到了三个中间件 但是如何实行呢 dispatch永远都是自定义的dispatch
            dispatch = compose(...chain)(store.dispatch);
            return {
               ...store,
                dispatch
            }
        }
    }
}