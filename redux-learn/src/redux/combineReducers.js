//这个函数要返回一个对象格式的返回值 {counter1:number,counter2:number}
function combineReducers(reducers) {
    //遍历获取reducers的key
    let reducerKeys = Object.keys(reducers);
    //这里需要返回reducer的格式，给createStore中的dispatch使用,而且返回一个对象格式
    //函数内部会通过遍历执行真正的reducer,取得对应的state
    //state，action是createStore中执行传入
    return function (state={},action) {
        let hasChange = false;//这个用来判断此次的派发动作有没有改变数据
        //保存每个reducer对应的state
        const nextState = {};
        //遍历key,组合返回对象，格式{counter1:number1}
        for (let i = 0; i < reducerKeys.length; i++) {
            //获取key
            let key = reducerKeys[i];
            //获取state 如果木有出发dispatch此时的state是undefind 这个是获取上一个状态 state在createStore中通过dispatch返回了对应的state,
            // 而且赋值给state了，派发过后就会存在值
            let previousStateForKey = state[key];
            //获取每个reducer
            const reducer = reducers[key];
            //执行每个reducer,获取state 这是如果不触发dispatch默认会走入reducer的默认值 0
            let nextStateForKey = reducer(previousStateForKey, action);
            //取得的state赋值到对应的key上面去
            nextState[key] = nextStateForKey;
            //看看是不是更新
            hasChange = hasChange || nextStateForKey !== previousStateForKey;
        }
        //如果数据更改了才返回新的
        return hasChange ? nextState : state;
    }
}

export default combineReducers;