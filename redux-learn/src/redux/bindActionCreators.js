//参数 接受actions 是处理state的各种动作 dispatch是派发动作
//这个函数其实就是将action和dispatch进行组装后返回
//这样可以不用每次都写dispatch({types:"add"})这样了
function bindActionCreators(actionCreators, dispatch) {
    //如果是actionCreators是函数的话
    if (typeof actionCreators === "function") {
        //这个返回的函数式给外面的人调用的，当然也可以在调用的时候转入参数
        //执行actions() 获取返回值 格式是{type："aaa"},然后调用dispatch
        return bindActionCreator(actionCreators,dispatch)
    }

    //如果是actionCreators是对象的话
    /* myActions = {
            add:(payLoad) => {
                 return {type:"ADD",...payLoad}
             },
             cut:() => {
                return {type:"CUT"}
             }
     };*/
    //遍历actionCreators
    //返回一个对象格式 {add:()=>dispatch(actions)}
    //定义一个对象接收处理后的函数
    let actions = {};
    for(let key in actionCreators) {
        //这个函数主要是给外部调用
        //获取每个函数执行 得到type
        //组装dispatch
        actions[key] = bindActionCreator(actionCreators[key], dispatch);
    }
    return actions;

    //定义一个公共方法来组装dispatch(action)
    function bindActionCreator(actionCreator,dispatch) {
        return (...arg)=>dispatch(actionCreator(arg))
    }

}

export default bindActionCreators;