function createStore(reducer) {
    //定义state保存当前的状态
    let state;
    //定义listener数组，用来保存订阅的函数
    let listeners = [];
    //定义getState函数，获取state的函数
    function getState() {
        return state;
    };
    //定义派发动作函数，接收参数是action
    function dispatch(action) {
        // 执行reducer
        // reducer是用户传进来的，参数有state,action
        // 他本来也是一个函数 只不过在内部执行后找到对应的action返回相应的值而已
        state = reducer(state, action);
        //遍历所有的订阅 执行里面的函数
        listeners.map(m=>m(state, action))
    }

    //定义订阅函数 用来给其他组件或者其他操作进行定义数据的变化 从而进行自身数据的更新
    //这个方法将传入的函数添加到数组队列中，在dispatch的时候触发所有的定义函数
    function subscribe(listener) {
        listeners.push(listener);
        //取消订阅
        //在这里返回一个函数，提供外部调用
        return function () {
            //原理就是：把订阅函数给过滤不要了
            //这里返回的listeners是不包含上次订阅的那个函数了，已经被过滤了
            listeners = listeners.filter(item => item !== listener);
        }
    }

    //如果页面默认没有触发dispatch的时候，其实state的值是undefind
    //所以需要默认触发一个dispatch的action 例如 @@redux/action 这个在reducer是没有对应的action,则会走default流程，从而返回state的默认值
    dispatch({type:"@@redux/action"});
    return {getState,dispatch,subscribe};
}

export default createStore;
