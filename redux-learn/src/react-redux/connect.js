//connect是一个高阶函数，传入一个组件，返回新的组件
//这个方法主要是将组件与创库store进行连接，store是通过上下文传递的 然后给新的组件转入state dispatch
import  React from "react";
//引入上下文对象
import  ReactReduxContext from "./context";
import {bindActionCreators} from "../redux";
//第一层函数参数是mapStateToProps actions ，mapStateToProps是回调函数 actions是一个函数，包含很多的actions
export default function (mapStateToProps,actions) {
    //第二层函数参数是 旧的组件 WrappedComponent
    return function (WrappedComponent) {
        return class extends React.Component{
            //这是固定的写法 定义就可以通过context获取store
            //因为Provider组件中转入了store这个属性
            static contextType = ReactReduxContext;
            //props可以接受传入的属性  context是可以获取上下文的
            constructor(props, context) {
                super(props);
                //1、
                //通过store获取对应的state
                //执行mapStateToProps，他是一个回调函数，转入state会返回对应的数据
                this.state = mapStateToProps(context.store.getState());
                //2、判断转入的actions是函数还是对象的格式
                //如果是函数，执行函数，将dispatch转入，函数内部就可以得到dispatch了
                if (typeof actions === "function") {
                    //执行
                    this.boundActions = actions(context.store.dispatch, props);
                }else {
                    //如果是对象格式 必须遍历对象 取出值 然后办通过dispatch进行绑定actions
                    //bindActionCreators这个方法是可以批量添加dispatch的绑定的
                    this.boundActions = bindActionCreators(actions, context.store.dispatch);
                }

            }
            componentDidMount() {
                //在组件渲染完成后要进行事件订阅 这样数据更新的时候才能重新渲染我们的组件
                this.unsubscribe = this.context.store.subscribe(()=>this.setState(mapStateToProps(this.context.store.getState())))
            }

            render() {
                //渲染转入的组件，然后将state,组装后的dispatch通过props传递给组件，返回新的组件
                return <WrappedComponent {...this.state} {...this.boundActions}/>
            }

            componentWillUnmount() {
                //取消订阅
                this.unsubscribe();
            }
        }
    }

};